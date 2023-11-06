/**
 * Substitui os valores entre `:` e `/` de uma rota dinâmica.
 *
 * @example
 *  replaceParams('/test/:id', '123') -> '/test/123'
 *  replaceParams('/test/:id/test/:testId', ['123', '345']) -> '/test/123/test/345'
 */
export const replaceParams = (route: string, values: string | string[]) => {
  let index = 0

  if (!Array.isArray(values)) {
    values = [values]
  }
  return route?.replace(/:[^/]+/g, () => values[index++])
}

/**
 * Substitui os valores entre `:` e `/` de uma rota dinâmica.
 *
 * @example
 *  replaceParams('/test/:id', '123') -> '/test/123'
 *  replaceParams('/test/:id/test/:testId', ['123', '345']) -> '/test/123/testId/345'
 */
export const updateParams = (
  route: string,
  values?: (string | undefined)[]
) => {
  let index = 0

  if (!values) {
    return route
  }

  if (values.some((v) => !v)) {
    return route
  }

  return route?.replace(/:[^/]+/g, () => values[index++] ?? '')
}
