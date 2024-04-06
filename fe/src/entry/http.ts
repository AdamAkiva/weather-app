import {
  compress,
  cors,
  createServer,
  express,
  readFile,
  type ViteDevServer
} from '../utils/index.js';

/**********************************************************************************/

export default class HttpServer {
  private static readonly ALLOWED_METHODS = new Set<string>([
    'HEAD',
    'GET',
    'POST',
    'PATCH',
    'DELETE',
    'OPTIONS'
  ] as const);

  private readonly _isProductionMode;
  private _templateHtml: string;

  private readonly _app;
  private readonly _server;

  private _vite: ViteDevServer | undefined;

  public constructor() {
    this._isProductionMode = import.meta.env.PROD;

    // Disable 'x-powered-by' should be pretty clear. Reason to disable etag
    // can be understood by this comprehensive answer: https://stackoverflow.com/a/67929691
    this._app = express().disable('etag').disable('x-powered-by');
    this._server = createServer(this._app);

    this._templateHtml = '';
    this._vite = undefined;

    this._attachConfigurations();
    this._attachEventHandlers();
  }

  public listen(port: number | string, callback?: () => void) {
    port = typeof port === 'string' ? Number(port) : port;

    return this._server.listen(port, callback);
  }

  public close() {
    this._server.close();
  }

  public async attachConfigurationMiddlewares(allowedOrigins: Set<string>) {
    this._app.use(
      cors({
        methods: Array.from(HttpServer.ALLOWED_METHODS),
        origin:
          allowedOrigins.size === 1
            ? Array.from(allowedOrigins)[0]
            : Array.from(allowedOrigins),
        maxAge: 86400, // 1 day in secs
        optionsSuccessStatus: 200 // last option here: https://github.com/expressjs/cors?tab=readme-ov-file#configuration-options
      }),
      compress()
    );
    if (!this._isProductionMode) {
      const { createServer: createViteServer } = await import('vite');

      this._vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'custom'
      });

      this._app.use(this._vite.middlewares);
    } else {
      this._app.use(
        (await import('helmet')).default({
          contentSecurityPolicy: true /* require-corp */,
          crossOriginEmbedderPolicy: { policy: 'require-corp' },
          crossOriginOpenerPolicy: { policy: 'same-origin' },
          crossOriginResourcePolicy: { policy: 'same-origin' },
          originAgentCluster: true,
          referrerPolicy: { policy: 'no-referrer' },
          strictTransportSecurity: {
            maxAge: 15_552_000, // seconds
            includeSubDomains: true
          },
          xContentTypeOptions: true,
          xDnsPrefetchControl: false,
          xDownloadOptions: true,
          xFrameOptions: { action: 'deny' },
          xPermittedCrossDomainPolicies: { permittedPolicies: 'none' },
          xXssProtection: true
        })
      );
      this._app.use(
        '/',
        (await import('sirv')).default('./build/client', { extensions: [] })
      );
    }
  }

  public setupSSR() {
    this._app.use('*', async (req, res, next) => {
      try {
        const url = req.originalUrl;

        let template: string = null!;
        let render: (url: string) => Promise<{ head?: string; html?: string }> =
          null!;
        if (!this._isProductionMode) {
          // In dev mode always read the static file(s)
          template = await readFile('./index.html', 'utf-8');
          template = await this._vite!.transformIndexHtml(url, template);
          render = (await this._vite!.ssrLoadModule('/src/entry/client.tsx'))
            .render;
        } else {
          // In production cache the static assets
          if (!this._templateHtml) {
            this._templateHtml = await readFile(
              './build/client/index.html',
              'utf-8'
            );
          }
          template = this._templateHtml;
          // @ts-expect-error - Build folder does not exist on local machine
          render = (await import('./build/server/entry/server.js')).render;
        }

        const rendered = await render(url);
        const html = template
          .replace(`<!--app-head-->`, rendered.head ?? '')
          .replace(`<!--app-html-->`, rendered.html ?? '');

        return res.status(200).set({ 'content-type': 'text/html' }).end(html);
      } catch (err) {
        if (err instanceof Error) {
          this._vite?.ssrFixStacktrace(err);
        }
        console.error(err);

        return next(err);
      }
    });
  }

  /********************************************************************************/

  private _attachConfigurations() {
    // Every configuration referring to sockets here, talks about network/tcp
    // socket NOT websockets. Network socket is the underlying layer for http
    // request (in this case). In short, the socket options refer to a "standard"
    // connection from a client
    this._server.maxHeadersCount = 50;
    this._server.headersTimeout = 20_000; // millis
    this._server.requestTimeout = 20_000; // millis
    // Connection close will terminate the tcp socket once the payload was
    // transferred and acknowledged. This setting is for the rare cases where,
    // for some reason, the tcp socket is left alive
    this._server.timeout = 600_000; // millis
    // See: https://github.com/nodejs/node/issues/40071
    // Leaving this without any limit will cause the server to reuse the
    // connection indefinitely (in theory). As a result, load balancing will
    // have very little effects if more instances of the server are brought up
    // by the deployment orchestration tool.
    // As for a good number, it depends on the application traffic.
    // The current value is random power of 2 which we liked
    this._server.maxRequestsPerSocket = 100;
    this._server.keepAliveTimeout = 10_000; // millis
  }

  private _attachEventHandlers() {
    this._server.on('error', (err) => {
      console.error(err, 'HTTP Server error');

      // If an event emitter error happened, we shutdown the application.
      // As a result we allow the deployment orchestration tool to attempt to
      // rerun the application in a clean state
      process.exit(1);
    });
  }
}
