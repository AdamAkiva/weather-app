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
  Dispatch,
  MaybeArray,
  ResolvedValue,
  SetState,
  SetStateAction,
  SwapKeysValue,
  UnknownObject
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
  type Dispatch,
  type MaybeArray,
  type ResolvedValue,
  type SetState,
  type SetStateAction,
  type SwapKeysValue,
  type SxProps,
  type Theme,
  type UnknownObject
};
