import { Resend } from 'resend';
import { WaitlistWelcome } from '@/emails/WaitlistWelcome';

const resendClient = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function sendWaitlistWelcome(
  toEmail: string
) {
  if (!resendClient) {
    console.log('[email:noop] WaitlistWelcome ->', toEmail);
    return;
  }

  const subject = 'Welcome to JustJapa — You\'re officially on the waitlist!';
  const text = `Hey ${toEmail},\n\nYou're officially on the JustJapa waitlist — where your journey to new opportunities abroad begins!\n\nAs part of our early community, you’ll be the first to access visa tools, migration guides, verified agents, and funding options that make relocating smarter, faster, and safer.\n\nWe’ll keep you updated as we roll out new features and invite batches from the waitlist.\n\nUntil then, stay ready — your next chapter starts soon! ✈️\n\n— The JustJapa Team`;

  try {
    await resendClient.emails.send({
      from: 'Japa <no-reply@updates.justjapa.com>',
      to: toEmail,
      subject,
      text,
      react: WaitlistWelcome({ email: toEmail }),
    });
  } catch (error) {
    console.error('Failed to send waitlist welcome email:', error);
  }
}


