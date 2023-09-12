export interface HttpResponseError {
  response: {
    status: number
    data: {
      type: 'info' | 'success' | 'error' | 'warn'
      message: string
    }
  }
}
