"use server";

import { Resend } from "resend";
import { ADMIN_EMAIL } from "@/constants";
import { env } from "@/env";

export async function sendContactEmail({
  name,
  email,
  phone,
  subject,
  message,
  service,
}: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  service?: string;
}) {
  try {
    const resend = new Resend(env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: `${name} <${ADMIN_EMAIL}>`,
      to: "Mr.hamood277@gmail.com",
      subject: `Requesting ${service} from <${email}>`,
      html: `
      ${`<p><strong>Subject:</strong> ${subject}</p>`}
      ${`<small><strong>Phone:</strong> ${phone}</small>`}
      ${`<p><strong>Message:</strong><br />${message}</p>`}
      ${`<small><strong>Email:</strong> ${email}</small>`}
      `,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
