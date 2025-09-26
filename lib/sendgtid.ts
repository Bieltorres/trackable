// lib/sendgrid.ts
import sgMail from "@sendgrid/mail";

if (!process.env.SENDGRID_API_KEY) {
  console.warn("SENDGRID_API_KEY não setado");
} else {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export async function sendEmail(to: string, subject: string, html: string) {
  if (!process.env.SENDGRID_API_KEY) {
    throw new Error("SENDGRID_API_KEY não configurada");
  }
  const msg = {
    to,
    from: process.env.SENDGRID_FROM!,
    subject,
    html,
  };

  try {
    await sgMail.send(msg);
    return true;
  } catch (error: any) {
    console.error("SendGrid error:", error?.response?.body || error);
    throw error;
  }
}
