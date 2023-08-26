import { v4 as uuid } from 'uuid'

export class Entity<T> {
  protected readonly _id: string
  public readonly props: T

  constructor(props: T, id?: string) {
    this.props = props
    this._id = id || uuid()
  }

  public equals(object?: Entity<T>): boolean {
    if (object == null || object == undefined) {
      return false
    }

    if (this === object) {
      return true
    }

    return this._id === object._id
  }
}
