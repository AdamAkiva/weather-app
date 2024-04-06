/**
 * DON'T change the import to the local one, this needs to happen before everything.
 * This makes sure the first thing the code does is changing the captureRejections
 * option to true to account for all new instances of EventEmitter. If every
 * module only exports functions and has no global variables, then, in theory
 * you could do it in a later stage. With that said we don't want to trust the
 * initialization order, so we make sure it is the first thing that is being done
 * When the server runs
 */
//
import { EventEmitter } from 'node:events';

// See: https://nodejs.org/api/events.html#capture-rejections-of-promises
EventEmitter.captureRejections = true;

// The default stack trace limit is 10 calls. Increasing it to a number which
// we'll never have to think about it again
Error.stackTraceLimit = 256;

/**********************************************************************************/

import { HttpServer } from './entry/index.ts';

/**********************************************************************************/

async function main() {
  const server = new HttpServer();

  await server.attachConfigurationMiddlewares(new Set());
  server.setupSSR();

  // Attaching the event handlers after the server initialization for two reasons.
  // Firstly, if an error occurred before this part, it is 98.7% a developer
  // mistake with the initialization of the server
  // Secondly, this is the first point where there are resources to cleanup
  // if something failed (partially true since the database is ready before
  // the server, but again, that goes more into the first point)
  process
    .on('warning', console.warn)
    .once('SIGINT', () => {
      server.close();
    })
    .once('SIGQUIT', () => {
      server.close();
    })
    .once('SIGTERM', () => {
      server.close();
    })
    .once('unhandledRejection', globalErrorHandler(server, 'rejection'))
    .once('uncaughtException', globalErrorHandler(server, 'exception'));

  server.listen(5611, () => {
    console.info(
      `Server is running in 'development' mode on: http://localhost:5611`
    );
  });
}

function globalErrorHandler(
  server: HttpServer,
  reason: 'exception' | 'rejection'
) {
  return (err: unknown) => {
    console.error(err, `Unhandled ${reason}`);

    server.close();

    // See: https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html#error-exception-handling
    process.exit(1);
  };
}

/**********************************************************************************/

await main();
