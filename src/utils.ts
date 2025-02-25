import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { ResponseError } from './interfaces.ts';

export function parseError(
  error: FetchBaseQueryError | SerializedError | undefined
) {
  if (error && 'status' in error && error.status) {
    return error as ResponseError;
  }
  return null;
}
