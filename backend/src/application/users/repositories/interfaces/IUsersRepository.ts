import { User } from '../../domain/user'

export interface IUsersRepository {
  findByEmail(email: string): Promise<User | null>
  exists(email: string): Promise<boolean>
  create(user: User): Promise<void>
}
