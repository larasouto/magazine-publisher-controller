import { v4 as uuid } from 'uuid'

export class Entity<T> {
  protected readonly _id: string
  public readonly props: T

  constructor(props: T, id?: string) {
    this._id = id || uuid()
    this.props = props
  }

  get id() {
    return this._id
  }

  public equals(object?: Entity<T> | null): boolean {
    if (object == null || object == undefined) {
      return false
    }

    if (this === object) {
      return true
    }

    return this.id === object.id
  }

  public toResponseBody() {
    return {
      id: this._id,
      ...this.props,
    }
  }
}
