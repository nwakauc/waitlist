'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);

  // Fetch initial waitlist count
  useEffect(() => {
    fetchWaitlistCount();
  }, []);

  const fetchWaitlistCount = async () => {
    try {
      const response = await fetch('/api/waitlist');
      if (response.ok) {
        const data = await response.json();
        setWaitlistCount(data.count);
      }
    } catch (error) {
      console.error('Error fetching waitlist count:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setMessage(data.message);
        setEmail('');
        setWaitlistCount(data.count);
      } else {
        setIsSuccess(false);
        setMessage(data.error);
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#F0F2F5' }}>
      {/* Background ellipses */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img
          src="/Ellipse 849.png"
          alt=""
          className="absolute bottom-0 w-1/2 max-w-xl opacity-70"
          style={{ left: 'calc(25% - 30px)' }}
        />
        <img
          src="/Ellipse 850.png"
          alt=""
          className="absolute bottom-0 w-1/2 max-w-xl opacity-70"
          style={{ right: 'calc(25% - 30px)' }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-16">
        <div className="max-w-3xl w-full text-center space-y-16">
          {/* Logo and Brand */}
          <div className="space-y-6">
            <img
              src="/logo.png"
              alt="JUSTJAPA Logo"
              className="mx-auto"
            />
          </div>

          {/* User avatars and count */}
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <img
                src="/users-joined.png"
                alt="Users joined waitlist"
                className="h-8"
              />
              {waitlistCount !== null && (
                <span className="text-gray-600 text-base font-medium">
                  {waitlistCount.toLocaleString()}+ users joined waitlist
                </span>
              )}
            </div>
          </div>

          {/* Main heading */}
          <div className="space-y-6">
            <h2 className="font-sora text-gray-900 max-w-4xl mx-auto" style={{
              fontWeight: 600,
              fontSize: '36px',
              lineHeight: '51px',
              letterSpacing: '-0.5px',
              textAlign: 'center'
            }}>
              The Smarter Way to <span className="text-blue-600">Japa</span>. Your All in One{' '}
              <span className="text-blue-600">Migration</span> Platform
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Plan your move, match with verified agents, secure your visa, connect with opportunities, and start your new life abroad.
            </p>
          </div>

          {/* Email form */}
          <div className="flex justify-center">
            <form onSubmit={handleSubmit} className="relative" style={{ width: '715px', height: '68px' }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                disabled={isSubmitting}
                className="w-full h-full pl-6 pr-40 text-base bg-white placeholder-gray-500 outline-none disabled:opacity-50 text-black"
                style={{
                  borderWidth: '1.5px',
                  borderColor: '#D1D5DB',
                  borderRadius: '93px'
                }}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-blue-600 text-white font-medium text-base hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
                style={{
                  borderRadius: '93px',
                  height: 'calc(100% - 20px)'
                }}
              >
                {isSubmitting ? 'Joining...' : 'Join Waitlist'}
              </button>
            </form>
          </div>

          {/* Success/Error message */}
          {message && (
            <div className={`mt-4 p-4 rounded-lg max-w-lg mx-auto ${
              isSuccess
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
