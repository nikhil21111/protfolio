"use client";

import { useState, useEffect } from "react";
import emailjs from '@emailjs/browser';

export default function ContactMe() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [charCount, setCharCount] = useState(0);

  // Initialize EmailJS on component mount
  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'gpPZ6Y4vxudOYgEfw';
    emailjs.init(publicKey);
    console.log('✅ EmailJS initialized with key:', publicKey);
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (formData.message.length > 0) {
      setIsTyping(true);
      timeout = setTimeout(() => setIsTyping(false), 500);
    }
    return () => clearTimeout(timeout);
  }, [formData.message]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill in all required fields");
      setTimeout(() => setError(null), 3000);
      return;
    }

    setSending(true);
    setError(null);

    try {
      // EmailJS configuration - Hardcoded with fallback to environment
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'gpPZ6Y4vxudOYgEfw';
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_b4p70vd';
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_8oqjo3g';

      console.log('🔍 EmailJS Config:', {
        hasEnvKey: !!process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
        publicKey: publicKey,
        serviceId: serviceId,
        templateId: templateId
      });

      // Send email using EmailJS
      // Using simple variable names that EmailJS understands
      const templateParams = {
        to_name: 'Nikhil',
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        reply_to: formData.email,
      };

      console.log('🔍 EmailJS Config:', { publicKey, serviceId, templateId });
      console.log('📧 Sending email with params:', templateParams);

      // Send without passing publicKey since it's already initialized
      const result = await emailjs.send(
        serviceId,
        templateId,
        templateParams
      );

      console.log('✅ EmailJS Response:', result);
      alert(`✅ Email sent successfully! Status: ${result.status} - Check your inbox at vekariyanikhil54@gmail.com`);

      setSubmitted(true);
      setCharCount(formData.message.length);
      setSending(false);

      // Reset form after success
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      }, 3000);

    } catch (err) {
      console.error('❌ Email send error:', err);
      const error = err as { message?: string; text?: string; status?: number };
      console.error('Error details:', {
        message: error?.message,
        text: error?.text,
        status: error?.status,
      });
      alert(`❌ Error: ${error?.text || error?.message || 'Unknown error'}`);
      setError(`Failed to send: ${error?.text || error?.message || 'Unknown error'}`);
      setSending(false);
      setTimeout(() => setError(null), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="p-6 space-y-4 overflow-auto h-full relative">
      {/* Animated particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `${i % 3 === 0 ? '#60a5fa' : i % 3 === 1 ? '#a78bfa' : '#f472b6'}`,
              opacity: 0.2,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${6 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="win95-border p-4 bg-gradient-to-r from-blue-50 to-purple-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-loading"></div>
        <h2 className="text-2xl font-bold mb-2 text-win95-blue flex items-center gap-2 animate-slideInDown">
          📧 <span className="animate-pulse">Get In Touch</span>
        </h2>
        <p className="text-sm text-gray-700 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
          Let&apos;s create something amazing together!
        </p>
      </div>

      {error && (
        <div className="win95-border p-4 bg-gradient-to-br from-red-50 to-orange-50 text-center animate-bounceIn">
          <div className="flex items-center justify-center gap-2 text-red-700">
            <span className="text-2xl">⚠️</span>
            <span className="font-bold">{error}</span>
          </div>
        </div>
      )}

      {submitted ? (
        <div className="win95-border p-6 bg-gradient-to-br from-green-50 to-teal-50 text-center relative overflow-hidden animate-bounceIn">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-green-400 rounded-full blur-3xl animate-pulse"></div>
          </div>
          <div className="relative z-10">
            <span className="text-6xl mb-4 block animate-bounce" style={{ animationDuration: '1s' }}>
              ✉️
            </span>
            <h3 className="text-xl font-bold text-green-700 mb-2">Message Sent! 🎉</h3>
            <p className="text-gray-700">Thanks for reaching out! I&apos;ll get back to you soon.</p>
            <div className="mt-4 win95-border-inset p-2 bg-white inline-block">
              <p className="text-xs font-mono animate-pulse">
                📊 Message length: <span className="font-bold text-blue-600">{charCount}</span> characters
              </p>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3 relative z-10">
          {/* Name field */}
          <div className="animate-slideInLeft" style={{ animationDelay: '0s' }}>
            <label className="block text-sm font-bold mb-1 text-win95-blue flex items-center gap-1">
              <span className="animate-pulse">👤</span> Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
              className={`w-full win95-border-inset p-2 bg-white transition-all duration-300 ${
                focusedField === 'name' ? 'scale-105 shadow-lg ring-2 ring-blue-300' : ''
              }`}
              placeholder="Enter your name..."
              required
            />
          </div>

          {/* Email field */}
          <div className="animate-slideInLeft" style={{ animationDelay: '0.1s' }}>
            <label className="block text-sm font-bold mb-1 text-win95-blue flex items-center gap-1">
              <span className="animate-pulse">📧</span> Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              className={`w-full win95-border-inset p-2 bg-white transition-all duration-300 ${
                focusedField === 'email' ? 'scale-105 shadow-lg ring-2 ring-purple-300' : ''
              }`}
              placeholder="your.email@example.com"
              required
            />
          </div>

          {/* Subject field */}
          <div className="animate-slideInLeft" style={{ animationDelay: '0.2s' }}>
            <label className="block text-sm font-bold mb-1 text-win95-blue flex items-center gap-1">
              <span className="animate-pulse">💬</span> Subject *
            </label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              onFocus={() => setFocusedField('subject')}
              onBlur={() => setFocusedField(null)}
              className={`w-full win95-border-inset p-2 bg-white transition-all duration-300 ${
                focusedField === 'subject' ? 'scale-105 shadow-lg ring-2 ring-pink-300' : ''
              }`}
              required
            >
              <option value="">Select a subject</option>
              <option value="collaboration">🤝 Project Collaboration</option>
              <option value="job">💼 Job Opportunity</option>
              <option value="question">❓ General Question</option>
              <option value="feedback">💭 Feedback</option>
              <option value="other">🔧 Other</option>
            </select>
          </div>

          {/* Message field */}
          <div className="animate-slideInLeft" style={{ animationDelay: '0.3s' }}>
            <label className="block text-sm font-bold mb-1 text-win95-blue flex items-center gap-2">
              <span className="animate-pulse">📝</span> Message *
              {isTyping && (
                <span className="text-xs text-green-600 animate-blink">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                  Typing...
                </span>
              )}
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              onFocus={() => setFocusedField('message')}
              onBlur={() => setFocusedField(null)}
              rows={6}
              className={`w-full win95-border-inset p-2 bg-white resize-none transition-all duration-300 ${
                focusedField === 'message' ? 'scale-105 shadow-lg ring-2 ring-cyan-300' : ''
              }`}
              placeholder="Tell me about your project or idea..."
              required
            />
            <p className="text-xs text-gray-600 mt-1 font-mono animate-pulse">
              {formData.message.length} characters
            </p>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={sending}
            className={`win95-button px-6 py-3 font-bold w-full transition-all duration-300 relative overflow-hidden group animate-slideInUp ${
              sending ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'
            }`}
            style={{ animationDelay: '0.4s' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity"></div>
            <span className="flex items-center justify-center gap-2 relative z-10">
              {sending ? (
                <>
                  <span className="animate-spin">⌛</span>
                  Sending...
                </>
              ) : (
                <>
                  <span className="group-hover:animate-bounce">🚀</span>
                  Send Message
                </>
              )}
            </span>
          </button>
        </form>
      )}

      {/* Social links */}
      <div className="win95-border p-4 bg-gradient-to-r from-purple-50 to-pink-50 animate-slideInUp" style={{ animationDelay: '0.5s' }}>
        <h3 className="font-bold mb-3 text-win95-blue flex items-center gap-2">
          <span className="animate-pulse">🌐</span> Connect With Me
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: "📧", label: "Email", text: "vekariyanikhil54@gmail.com", color: "from-blue-400 to-blue-600", link: "mailto:vekariyanikhil54@gmail.com" },
            { icon: "💼", label: "LinkedIn", text: "Nikhil Vekariya", color: "from-blue-500 to-blue-700", link: "https://www.linkedin.com/in/nikhil-vekariya-6b5907326" },
            { icon: "🐙", label: "GitHub", text: "@nikhil21111", color: "from-gray-600 to-gray-800", link: "https://github.com/nikhil21111" },
            { icon: "📸", label: "Instagram", text: "@_nikhil_vekariya_", color: "from-pink-500 to-purple-600", link: "https://www.instagram.com/_nikhil_vekariya_" },
          ].map((social, idx) => (
            <a
              key={social.label}
              href={social.link || '#'}
              target={social.link ? "_blank" : undefined}
              rel={social.link ? "noopener noreferrer" : undefined}
              className="win95-border-inset p-2 bg-white hover:scale-105 transition-all duration-300 relative overflow-hidden group cursor-pointer block"
              style={{ animation: `popIn 0.4s ease-out ${idx * 0.1}s both` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${social.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
              <div className="flex flex-col relative z-10">
                <span className="text-xs font-bold flex items-center gap-1">
                  <span className="group-hover:animate-bounce">{social.icon}</span>
                  {social.label}
                </span>
                <span className="text-xs text-gray-600 font-mono">{social.text}</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          70% {
            transform: scale(1.1);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-30px) translateX(10px);
          }
        }
        @keyframes loading {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes blink {
          0%, 50%, 100% { opacity: 1; }
          25%, 75% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
