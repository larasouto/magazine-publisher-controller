import { User } from '../../domain/user'

export interface IUsersRepository {
  findById(id: string): Promise<User>
  findByEmail(email: string): Promise<User>
  exists(email: string): Promise<boolean>
  create(user: User): Promise<void>
}
