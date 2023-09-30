type ResponseBody<T> = {
  dto: {
    _id: string
    props: T
  }
}

export const toResponseBody = <T>(data: ResponseBody<T>) => {
  return {
    id: data.dto._id,
    ...data.dto.props
  }
}
