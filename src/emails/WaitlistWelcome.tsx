type Props = { email: string; referralSource?: string };

export function WaitlistWelcome({ email }: Props) {
  return (
    <html>
      <head>
        {/* Head is ignored by most email renderers but style should be inlined for most email services */}
      </head>
      <body style={{ margin: 0, padding: 0, backgroundColor: '#f5f8fb', fontFamily: 'Inter, Arial, sans-serif' }}>
        <div style={{ maxWidth: 600, background: '#ffffff', margin: '40px auto', borderRadius: 12, boxShadow: '0 4px 16px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
          <div style={{ background: 'linear-gradient(90deg, #0072ff 0%, #00c6ff 100%)', color: '#fff', textAlign: 'center', padding: '40px 20px' }}>
            {/* You can add your logo image here if you want */}
            <h1 style={{ fontSize: 24, margin: 0 }}>Welcome to JustJapa</h1>
          </div>
          <div style={{ padding: '30px 40px', color: '#333', lineHeight: 1.6 }}>
            <h2 style={{ color: '#0072ff' }}>Hey {email},</h2>
            <p>You're officially on the <strong>JustJapa</strong> waitlist — where your journey to new opportunities abroad begins!</p>
            <p>As part of our early community, you’ll be the first to access visa tools, migration guides, verified agents, Japa AI, and funding options that make relocating easier, faster, and affordable.</p>
            <p>We’ll keep you updated as we roll out new features and invite batches from the waitlist.</p>
            <a
              href="https://justjapa.com"
              style={{ display: 'inline-block', background: '#0072ff', color: '#fff', textDecoration: 'none', padding: '12px 24px', borderRadius: 8, fontWeight: 600, marginTop: 20 }}
            >
              Visit JustJapa
            </a>
            <p style={{ marginTop: 20 }}>Until then, stay ready — your next chapter starts soon ✈️</p>
            <p>— The JustJapa Team</p>
          </div>
          <div style={{ background: '#f0f4f8', textAlign: 'center', padding: 20, fontSize: 14, color: '#777' }}>
            <p>© 2025 JustJapa. All rights reserved.</p>
            <p>
              <a href="https://justjapa.com" style={{ color: '#0072ff', textDecoration: 'none' }}>
                justjapa.com
              </a>
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}


