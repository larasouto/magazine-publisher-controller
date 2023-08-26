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
