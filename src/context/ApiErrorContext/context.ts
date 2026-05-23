import { createContext } from 'react';
import type { IApiErrorContext } from './types';

export const ApiErrorContext = createContext<IApiErrorContext | null>(null);
