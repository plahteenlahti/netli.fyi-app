export type ErrorType =
  | 'HttpError'
  | 'NotFoundError'
  | 'NetworkError'
  | 'UnexpectedError'

export class HttpError extends Error {
  readonly statusCode?: number
  readonly errorCode?: number
  readonly errorType: ErrorType
  constructor({
    message,
    statusCode,
    errorCode
  }: {
    message: string
    statusCode?: number
    errorCode?: number
  }) {
    super(message)
    this.statusCode = statusCode
    this.errorCode = errorCode
    this.errorType = 'HttpError'
  }
}

export class NotFoundError extends Error {
  readonly statusCode?: number
  readonly errorCode?: number
  readonly errorType: ErrorType
  constructor({
    message,
    statusCode,
    errorCode
  }: {
    message: string
    statusCode?: number
    errorCode?: number
  }) {
    super(message)
    this.statusCode = statusCode
    this.errorCode = errorCode
    this.errorType = 'NotFoundError'
  }
}

export class NetworkError extends Error {
  readonly statusCode?: number
  readonly errorCode?: number
  readonly errorType: ErrorType
  constructor({
    message,
    statusCode,
    errorCode
  }: {
    message: string
    statusCode?: number
    errorCode?: number
  }) {
    super(message)
    this.statusCode = statusCode
    this.errorCode = errorCode
    this.errorType = 'NetworkError'
  }
}
