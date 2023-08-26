import { User } from "../entities/User"

export interface IUsersRepository {
  save(user: User): Promise<void>
  findByEmail(email: string): Promise<User>
}
