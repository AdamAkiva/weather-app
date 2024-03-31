import {
  CircularProgress,
  styled,
  type SxProps,
  type Theme
} from '@mui/material';
import ky, { HTTPError } from 'ky';
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
import { uppercaseFirstLetter } from './functions.ts';
import type {
  AddOptional,
  AddRequired,
  MaybeArray,
  OnClickCb,
  ResolvedValue,
  SetState,
  SwapKeysValue,
  UnknownObject,
  Views
} from './types.ts';

/**********************************************************************************/

export {
  CircularProgress,
  getEnvValue,
  getRuntimeMode,
  HTTPError,
  ky,
  React,
  ReactDOM,
  StrictMode,
  styled,
  uppercaseFirstLetter,
  useCallback,
  useEffect,
  useRef,
  useState,
  WeatherAppError,
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
