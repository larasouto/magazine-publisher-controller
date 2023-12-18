export interface IEmailService {
  sendEmail(
    to: string,
    subject: string,
    content: string,
    html?: boolean,
  ): Promise<void>
}
