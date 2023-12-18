import { Either, left, right } from '@/core/logic/either'
import { IEmailService } from '@/infra/providers/models/IEmailService'
import { JWT } from '../../../../core/domain/jwt'
import { UserDoesNotExistError } from './errors/UserDoesNotExistError'
import { IUsersRepository } from '../../repositories/interfaces/IUsersRepository'

type ForgotPasswordRequest = {
  email: string
}

type ForgotPassWordResponse = Either<UserDoesNotExistError, null>

export class ForgotPassword {
  constructor(
    private usersRepository: IUsersRepository,
    private emailService: IEmailService,
  ) {}

  async execute({
    email,
  }: ForgotPasswordRequest): Promise<ForgotPassWordResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      return left(new UserDoesNotExistError())
    }
    const { token } = JWT.signUser(user)

    await this.emailService.sendEmail(
      email,
      'Recover Password',
      `Here is your link to recover your password: http://localhost:3333/recover-password/${token}`,
    )

    return right(null)
  }
}
