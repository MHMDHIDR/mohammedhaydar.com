import type { ContactFormInputsProps } from '@/types'
import { createTransport } from 'nodemailer'

const SendEmail = async ({
  name,
  email,
  subject,
  message,
  from,
  to
}: ContactFormInputsProps) => {
  /**
   * @returns {Promise<any>} JSON
   */

  name = name || 'info@mohammedhaydar.com'
  from = email || 'Mr.hamood277@gmail.com'
  to = to || 'info@mohammedhaydar.com'

  // create reusable transporter object using the default SMTP transport
  const transporter = createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.MAILER_EMAIL,
      pass: process.env.MAILER_PASSWORD
    }
  })

  // send mail with defined transport object
  const emailResponse = await transporter.sendMail({
    subject,
    from: `"${from}" <${name}>`,
    to,
    html: message
  })

  return emailResponse
}

export default SendEmail
