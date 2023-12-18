import nodemailer from 'nodemailer'
import { IEmailService } from '../models/IEmailService'

interface IMailOptions {
  from: string
  to: string
  subject: string
  text?: string
  html?: string
}

export class NodeMailerService implements IEmailService {
  private init() {
    const transporter = nodemailer.createTransport({
      host: 'smtp.umbler.com',
      port: 465,
      secure: true,
      auth: {
        user: 'no-reply@test.com.br',
        pass: 'hengek-fisrir-0cuhKo',
      },
    })

    return transporter
  }

  async sendEmail(
    to: string,
    subject: string,
    content: string,
    html?: boolean | undefined,
  ): Promise<void> {
    const transporter = this.init()

    let mailOptions: IMailOptions = {
      from: 'no-reply@test.com.br',
      to,
      subject,
    }

    html == true ? (mailOptions.html = content) : (mailOptions.text = content)

    return await transporter.sendMail(mailOptions)
  }
}
