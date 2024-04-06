import react from '@vitejs/plugin-react-swc';
import { defineConfig, type UserConfig } from 'vite';

/******************************************************************************/

// https://vitejs.dev/config/

export default defineConfig(({ command }): UserConfig => {
  const sharedConfig = {
    root: './',
    envPrefix: 'WEATHER_APP_',
    publicDir: './public',
    plugins: [react()]
  };

  if (command === 'build') {
    return {
      ...sharedConfig,
      build: {
        outDir: './build'
      },
      esbuild: {
        drop: ['console', 'debugger']
      }
    };
  }

  return {
    ...sharedConfig,
    css: {
      devSourcemap: true
    },
    server: {
      host: '0.0.0.0',
      port: Number(process.env.SERVER_PORT),
      strictPort: true
    }
  };
});
