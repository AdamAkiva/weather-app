import { CircularProgress, styled } from '@mui/material';
import { HTTPError } from 'ky';
import React, {
  StrictMode,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import ReactDOM from 'react-dom/client';

import { getEnvValue, getRuntimeMode } from './env.ts';
import WeatherAppError from './error.ts';
import { formatTime, uppercaseFirstLetter } from './functions.ts';
import { httpInstance } from './http.ts';
import type {
  AddOptional,
  AddRequired,
  MaybeArray,
  OnClickCb,
  ResolvedValue,
  SetState,
  SwapKeysValue,
  SxProps,
  Theme,
  UnknownObject,
  Views
} from './types.ts';

/**********************************************************************************/

export {
  CircularProgress,
  HTTPError,
  React,
  ReactDOM,
  StrictMode,
  WeatherAppError,
  formatTime,
  getEnvValue,
  getRuntimeMode,
  httpInstance,
  styled,
  uppercaseFirstLetter,
  useCallback,
  useEffect,
  useRef,
  useState,
  type AddOptional,
  type AddRequired,
  type MaybeArray,
  type OnClickCb,
  type ResolvedValue,
  type SetState,
  type SwapKeysValue,
  type SxProps,
  type Theme,
  type UnknownObject,
  type Views
};
