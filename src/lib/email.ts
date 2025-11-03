import nodemailer from 'nodemailer';

export async function sendWaitlistWelcome(toEmail: string) {
  // Validate environment variables
  if (!process.env.MAIL_USER || !process.env.MAIL_PASSWORD) {
    console.error('❌ Email credentials not configured. Set MAIL_USER and MAIL_PASSWORD in environment variables.');
    throw new Error('Email credentials not configured');
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: true,
    },
  });

  const subject = "Welcome to JustJapa — You're officially on the waitlist!";
  const text = `Hey ${toEmail},\n\nYou're officially on the JustJapa waitlist — where your journey to new opportunities abroad begins!\n\nAs part of our early community, you'll be the first to access visa tools, migration guides, verified agents, and funding options that make relocating smarter, faster, and safer.\n\nWe'll keep you updated as we roll out new features and invite batches from the waitlist.\n\nUntil then, stay ready — your next chapter starts soon! ✈️\n\n— The JustJapa Team`;

  // Generate HTML email directly
  const html = `
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; background-color: #f5f8fb; font-family: Inter, Arial, sans-serif;">
        <div style="max-width: 600px; background: #ffffff; margin: 40px auto; border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.05); overflow: hidden;">
          <div style="background: linear-gradient(90deg, #0072ff 0%, #00c6ff 100%); color: #fff; text-align: center; padding: 40px 20px;">
            <h1 style="font-size: 24px; margin: 0;">Welcome to JustJapa</h1>
          </div>
          <div style="padding: 30px 40px; color: #333; line-height: 1.6;">
            <h2 style="color: #0072ff;">Hey ${toEmail},</h2>
            <p>You're officially on the <strong>JustJapa</strong> waitlist — where your journey to new opportunities abroad begins!</p>
            <p>As part of our early community, you'll be the first to access visa tools, migration guides, verified agents, Japa AI and funding options that make relocating easier, faster, and affordable.</p>
            <p>We'll keep you updated as we roll out new features and invite batches from the waitlist.</p>
            <a
              href="https://justjapa.com"
              style="display: inline-block; background: #0072ff; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; margin-top: 20px;"
            >
              Visit JustJapa
            </a>
            <p style="margin-top: 20px;">Until then, stay ready — your next chapter starts soon ✈️</p>
            <p>— The JustJapa Team</p>
          </div>
          <div style="background: #f0f4f8; text-align: center; padding: 20px; font-size: 14px; color: #777;">
            <p>© 2025 JustJapa. All rights reserved.</p>
            <p>
              <a href="https://justjapa.com" style="color: #0072ff; text-decoration: none;">
                justjapa.com
              </a>
            </p>
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    console.log(`[email:attempting] Sending to ${toEmail} from ${process.env.MAIL_USER}`);

    const info = await transporter.sendMail({
      from: `JustJapa <${process.env.MAIL_USER}>`, // Use authenticated email
      to: toEmail,
      subject,
      text,
      html,
      // bcc: 'youradmin@justjapa.com', // uncomment this if you want admin copies
    });

    console.log(`✅ [email:sent] WaitlistWelcome -> ${toEmail}`, { messageId: info.messageId });
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Failed to send waitlist welcome email:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      code: (error as any)?.code,
      command: (error as any)?.command,
      response: (error as any)?.response,
      toEmail,
    });
    // Don't throw - we don't want to block the user signup if email fails
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}


