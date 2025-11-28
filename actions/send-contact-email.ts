"use server";

import { Resend } from "resend";

import type { ContactFormData } from "@/components/pages/index/contact-form";

const resend = new Resend(process.env.RESEND_API_KEY);
const contactEmail = process.env.CONTACT_EMAIL || "drew@drucial.dev";
const fromEmail = process.env.FROM_EMAIL || "noreply@contact.drucial.dev";

type SendContactEmailResult = {
  success: boolean;
  error?: string;
};

export async function sendContactEmail(
  formData: ContactFormData
): Promise<SendContactEmailResult> {
  const { name, email, projectType, selectedDate, selectedTime, message } =
    formData;

  // Format date for email
  const today = new Date();
  const formattedDate = selectedDate
    ? `${today.toLocaleString("default", { month: "long" })} ${selectedDate}, ${today.getFullYear()}`
    : null;

  const subject = projectType
    ? `${projectType} Project Inquiry`
    : "New Project Inquiry";

  // Shared email preview content (matches the live preview on the site)
  const emailPreview = `
<table width="100%" cellpadding="0" cellspacing="0" style="background-color: #141414; border: 1px solid #262626;">
  <tr>
    <td style="padding: 24px; color: #a3a3a3; font-size: 14px; line-height: 1.6;">
      <p style="margin: 0 0 16px 0;">Hi Drucial,</p>
      <p style="margin: 0 0 16px 0; white-space: pre-wrap;">${message || "I'd like to discuss a potential project with you..."}</p>
      ${
        formattedDate || selectedTime
          ? `<p style="margin: 0 0 16px 0;">I'm available to chat on <span style="color: #fafafa;">${formattedDate || "___"}</span>${selectedTime ? ` at <span style="color: #fafafa;">${selectedTime}</span>` : ""}.</p>`
          : ""
      }
      <p style="margin: 0 0 16px 0;">Looking forward to hearing from you.</p>
      <p style="margin: 0;">
        Best,<br>
        <span style="color: #fafafa;">${name}</span>
      </p>
    </td>
  </tr>
</table>
  `.trim();

  // Email to Drew - just the preview with a simple header
  const drewEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px;">
          <!-- Header -->
          <tr>
            <td style="padding: 0 0 16px 0;">
              <p style="margin: 0; color: #666; font-size: 12px;">New inquiry from <span style="color: #a3a3a3;">${name}</span> &lt;${email}&gt;</p>
            </td>
          </tr>
          <!-- Email Preview -->
          <tr>
            <td>
              ${emailPreview}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  // Confirmation email to user - intro text + same preview
  const userEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px;">
          <!-- Header -->
          <tr>
            <td style="padding: 0 0 16px 0;">
              <p style="margin: 0 0 8px 0; color: #fafafa; font-size: 16px; font-weight: 600;">Thanks for reaching out!</p>
              <p style="margin: 0; color: #666; font-size: 14px;">I've received your message and will get back to you within 24 hours. Here's a copy of what you sent:</p>
            </td>
          </tr>
          <!-- Email Preview -->
          <tr>
            <td>
              ${emailPreview}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  try {
    // Send both emails in parallel
    const [drewEmail, userEmail] = await Promise.all([
      // Email to Drew
      resend.emails.send({
        from: `Contact Form <${fromEmail}>`,
        to: contactEmail,
        subject: `[Contact] ${subject} - ${name}`,
        html: drewEmailHtml,
        replyTo: email,
      }),
      // Confirmation to user
      resend.emails.send({
        from: `Drew White <${fromEmail}>`,
        to: email,
        subject: "Thanks for reaching out!",
        html: userEmailHtml,
      }),
    ]);

    if (drewEmail.error || userEmail.error) {
      console.error("Email error:", drewEmail.error || userEmail.error);

      return {
        success: false,
        error: "Failed to send email. Please try again.",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Send email error:", error);

    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
}
