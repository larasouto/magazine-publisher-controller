import { StatusCodes } from 'http-status-codes'

export type HttpResponse = {
  statusCode: number
  body: any
}

export type Response = {
  type?: 'info' | 'success' | 'warn' | 'error'
  message: string
}

export function ok<T>(dto?: T, response?: Response): HttpResponse {
  return {
    statusCode: StatusCodes.OK,
    body: {
      type: response?.type ?? 'success',
      message: response?.message,
      ...dto,
    },
  }
}

export function created(response?: Response): HttpResponse {
  return {
    statusCode: StatusCodes.CREATED,
    body: {
      type: response?.type ?? 'success',
      message: response?.message,
    },
  }
}

export function clientError(response?: Response): HttpResponse {
  return {
    statusCode: StatusCodes.BAD_REQUEST,
    body: {
      type: response?.type ?? 'error',
      message: response?.message,
    },
  }
}

export function unauthorized(response?: Response): HttpResponse {
  return {
    statusCode: StatusCodes.UNAUTHORIZED,
    body: {
      type: response?.type ?? 'error',
      message: response?.message,
    },
  }
}

export function forbidden(response?: Response): HttpResponse {
  return {
    statusCode: StatusCodes.FORBIDDEN,
    body: {
      type: response?.type ?? 'error',
      message: response?.message,
    },
  }
}

export function notFound(response?: Response): HttpResponse {
  return {
    statusCode: StatusCodes.NOT_FOUND,
    body: {
      type: response?.type ?? 'error',
      message: response?.message,
    },
  }
}

export function conflict(response?: Response): HttpResponse {
  return {
    statusCode: StatusCodes.CONFLICT,
    body: {
      type: response?.type ?? 'info',
      message: response?.message,
    },
  }
}

export function tooMany(response?: Response): HttpResponse {
  return {
    statusCode: StatusCodes.TOO_MANY_REQUESTS,
    body: {
      type: response?.type ?? 'error',
      message: response?.message,
    },
  }
}

export function fail(response?: Response) {
  return {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    body: {
      type: response?.type ?? 'error',
      message: response?.message,
    },
  }
}
