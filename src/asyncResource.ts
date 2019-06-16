export interface AsyncFetching<T> {
  type: "FETCHING",
}

export interface AsyncSuccess<T> {
  type: "SUCCESS",
  value: T,
}

export interface AsyncFailed<T> {
  type: "FAILED",
  error: string,
}

export type AsyncResult<T> = AsyncSuccess<T> | AsyncFailed<T> | AsyncFetching<T>;

export function fetching<T>(): AsyncResult<T> {
  return {
    type: "FETCHING",
  };
}

export function success<T>(value: T): AsyncResult<T> {
  return {
    type: "SUCCESS",
    value,
  };
}

export function failed<T>(error: string): AsyncResult<T> {
  return {
    type: "FAILED",
    error,
  };
}

export function isFetching<T>(result: AsyncResult<T>): result is AsyncFetching<T> {
  return result.type === "FETCHING";
}

export function isSuccess<T>(result: AsyncResult<T>): result is AsyncSuccess<T> {
  return result.type === "SUCCESS";
}

export function isFailed<T>(result: AsyncResult<T>): result is AsyncFailed<T> {
  return result.type === "FAILED";
}

export function swch<T, R>(r: AsyncResult<T>, onFetching: (r: AsyncFetching<T>) => R, onSuccess: (r: AsyncSuccess<T>) => R, onFailed: (r: AsyncFailed<T>) => R) {
  if (isFetching(r)) {
    return onFetching(r)
  } else if (isSuccess(r)) {
    return onSuccess(r)
  } else if (isFailed(r)) {
    return onFailed(r)
  }
  throw new Error(`Wrong runtime value: ${JSON.stringify(r)}` );
}
