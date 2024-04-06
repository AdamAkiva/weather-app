import type { NextFunction, Request, Response } from 'express';

/**********************************************************************************/

export type UnknownObject = { [key: string]: unknown };

export type Mode = 'development' | 'production' | 'test';
export type EnvironmentVariables = {
  mode: Mode;
  server: {
    port: string;
    url: string;
    apiRoute: string;
    healthCheck: { route: string; allowedHosts: Set<string> };
    allowedOrigins: Set<string>;
  };
};

/**********************************************************************************/

export { type NextFunction, type Request, type Response };
