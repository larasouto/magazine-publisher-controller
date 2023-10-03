type CustomMessageProps = {
  key: string
  values?: object
}

export const params = ({ key, values }: CustomMessageProps) => {
  return {
    params: {
      i18n: { key, values }
    }
  }
}

export const innerParams = ({ key, values }: CustomMessageProps) => {
  return {
    i18n: { key, values }
  }
}
