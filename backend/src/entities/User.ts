import { Entity } from './Entity'

export interface UserProps {
  email: string
  password: string
}

export class User extends Entity<UserProps> {

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  public constructor(props: UserProps, id?: string) {
    super(props, id)
  }
  
}
