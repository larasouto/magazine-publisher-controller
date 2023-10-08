import { User } from '../../domain/user'
import { IUsersRepository } from '../interfaces/IUsersRepository'

export class InMemoryUsersRepository implements IUsersRepository {
  constructor(public users: User[] = []) {}

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === id)

    return user ?? null
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.props.email === email)

    return user ?? null
  }

  async exists(email: string): Promise<boolean> {
    const user = this.users.some((user) => user.props.email === email)
    return !!user
  }

  async create(user: User): Promise<void> {
    this.users.push(user)
  }
}
