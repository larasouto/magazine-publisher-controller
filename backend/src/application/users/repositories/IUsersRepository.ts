import { User } from '../domain/user'

export interface IUsersRepository {
  findByEmail(email: string): Promise<User | null>
  exists(email: string): Promise<boolean>
  save(user: User): Promise<void>
  create(user: User): Promise<void>
}
