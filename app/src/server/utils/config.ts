import type { EnvironmentVariables, Mode } from '../types.ts';
import { ERR_CODES } from './constants.ts';
import {
  isDevelopmentMode,
  isProductionMode,
  isTestMode
} from './functions.ts';

/**********************************************************************************/

export const getEnv = (): EnvironmentVariables => {
  const mode = checkRuntimeEnv(process.env.NODE_ENV);
  checkEnvVariables(mode);

  return {
    mode: mode,
    server: {
      port: process.env.SERVER_PORT!,
      url: process.env.SERVER_URL!,
      apiRoute: process.env.API_ROUTE!,
      healthCheck: {
        route: process.env.HEALTH_CHECK_ROUTE!,
        allowedHosts: new Set(process.env.ALLOWED_HOSTS!.split(','))
      },
      allowedOrigins: new Set(process.env.ALLOWED_ORIGINS!.split(','))
    }
  };
};

const checkRuntimeEnv = (mode?: string) => {
  if (isDevelopmentMode(mode) || isTestMode(mode) || isProductionMode(mode)) {
    return mode as Mode;
  }

  console.error(
    `Missing or invalid 'NODE_ENV' env value, should never happen.` +
      ' Unresolvable, exiting...'
  );

  process.exit(ERR_CODES.EXIT_NO_RESTART);
};

const checkEnvVariables = (mode: Mode) => {
  let missingValues = '';
  mapEnvironmentVariables(mode).forEach((val) => {
    if (!process.env[val]) {
      missingValues += `* Missing ${val} environment variable\n`;
    }
  });
  if (missingValues) {
    console.error(`\nMissing the following env vars:\n${missingValues}`);

    process.exit(ERR_CODES.EXIT_NO_RESTART);
  }
};

const mapEnvironmentVariables = (mode: Mode) => {
  const environmentVariables = [
    'SERVER_PORT',
    'SERVER_URL',
    'API_ROUTE',
    'HEALTH_CHECK_ROUTE',
    'ALLOWED_HOSTS',
    'ALLOWED_ORIGINS'
  ];
  if (mode === 'development') {
    environmentVariables.push('SERVER_DEBUG_PORT');
  }

  return environmentVariables;
};
