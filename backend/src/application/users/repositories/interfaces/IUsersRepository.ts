import { User } from '../../domain/user'

export interface IUsersRepository {
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  exists(email: string): Promise<boolean>
  create(user: User): Promise<void>
}
