export type HttpResponse = {
  statusCode: number
  body: any
}

export type Response = {
  type?: 'info' | 'success' | 'warn' | 'error'
  message: string
}

export function ok<T>(dto?: T): HttpResponse {
  return {
    statusCode: 200,
    body: dto,
  }
}

export function created(response?: Response): HttpResponse {
  return {
    statusCode: 201,
    body: {
      type: response?.type ?? 'success',
      message: response?.message,
    },
  }
}

export function clientError(response?: Response): HttpResponse {
  return {
    statusCode: 400,
    body: {
      type: response?.type ?? 'error',
      message: response?.message,
    },
  }
}

export function unauthorized(response?: Response): HttpResponse {
  return {
    statusCode: 401,
    body: {
      type: response?.type ?? 'error',
      message: response?.message,
    },
  }
}

export function forbidden(response?: Response): HttpResponse {
  return {
    statusCode: 403,
    body: {
      type: response?.type ?? 'error',
      message: response?.message,
    },
  }
}

export function notFound(response?: Response): HttpResponse {
  return {
    statusCode: 404,
    body: {
      type: response?.type ?? 'error',
      message: response?.message,
    },
  }
}

export function conflict(response?: Response): HttpResponse {
  return {
    statusCode: 409,
    body: {
      type: response?.type ?? 'info',
      message: response?.message,
    },
  }
}

export function tooMany(response?: Response): HttpResponse {
  return {
    statusCode: 429,
    body: {
      type: response?.type ?? 'error',
      message: response?.message,
    },
  }
}

export function fail(response?: Response) {
  return {
    statusCode: 500,
    body: {
      type: response?.type ?? 'error',
      message: response?.message,
    },
  }
}
