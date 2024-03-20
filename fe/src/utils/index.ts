import React, {
  StrictMode,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import ReactDOM from 'react-dom/client';

import { getEnvValue, getRuntimeMode } from './env.ts';
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
  React,
  ReactDOM,
  StrictMode,
  getEnvValue,
  getRuntimeMode,
  uppercaseFirstLetter,
  useCallback,
  useEffect,
  useRef,
  useState,
  type AddOptional,
  type AddRequired,
  type Dispatch,
  type MaybeArray,
  type ResolvedValue,
  type SetState,
  type SetStateAction,
  type SwapKeysValue,
  type UnknownObject
};
