import React, { useState } from 'react';
import { personalInfo } from '../../data/portfolio';
import { motion } from 'framer-motion';
import Magnetic from '../ui/Magnetic';
import { Mail, Github, Linkedin, ArrowUpRight, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || 'Failed to send message');
      }
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="py-32 md:py-48">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-sm font-bold text-accent uppercase tracking-widest mb-4">Connection</h2>
            <h3 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-tight">
              Let&apos;s build <br /> <span className="text-gradient">something great.</span>
            </h3>
            <p className="text-lg max-w-md leading-relaxed mb-12">
              I&apos;m currently open to new opportunities and collaborations. Feel free to reach out via the form or connect on social platforms.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Magnetic strength={0.2}>
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="group flex flex-col p-6 rounded-[2rem] bg-foreground/[0.03] border border-foreground/5 hover:border-accent/40 transition-all duration-300">
                  <Github size={24} className="text-accent mb-3" />
                  <h4 className="text-xs font-bold text-muted uppercase tracking-wider">GitHub</h4>
                  <div className="flex items-center justify-between mt-auto pt-3">
                    <span className="text-base font-bold">Follow</span>
                    <ArrowUpRight size={18} className="text-muted group-hover:text-accent group-hover:rotate-45 transition-all" />
                  </div>
                </a>
              </Magnetic>
              <Magnetic strength={0.2}>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="group flex flex-col p-6 rounded-[2rem] bg-foreground/[0.03] border border-foreground/5 hover:border-accent/40 transition-all duration-300">
                  <Linkedin size={24} className="text-accent mb-3" />
                  <h4 className="text-xs font-bold text-muted uppercase tracking-wider">LinkedIn</h4>
                  <div className="flex items-center justify-between mt-auto pt-3">
                    <span className="text-base font-bold">Connect</span>
                    <ArrowUpRight size={18} className="text-muted group-hover:text-accent group-hover:rotate-45 transition-all" />
                  </div>
                </a>
              </Magnetic>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="p-8 rounded-[2rem] bg-foreground/[0.03] border border-foreground/5 space-y-5">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">Name</label>
                  <input id="contact-name" type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Your name" className="w-full px-4 py-3 rounded-xl bg-background border border-foreground/10 text-foreground placeholder:text-muted/50 focus:border-accent focus:ring-1 focus:ring-accent/30 outline-none transition-all duration-300" />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">Email</label>
                  <input id="contact-email" type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="your@email.com" className="w-full px-4 py-3 rounded-xl bg-background border border-foreground/10 text-foreground placeholder:text-muted/50 focus:border-accent focus:ring-1 focus:ring-accent/30 outline-none transition-all duration-300" />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">Message</label>
                  <textarea id="contact-message" name="message" value={formData.message} onChange={handleChange} required rows={5} placeholder="Tell me about your project or just say hello..." className="w-full px-4 py-3 rounded-xl bg-background border border-foreground/10 text-foreground placeholder:text-muted/50 focus:border-accent focus:ring-1 focus:ring-accent/30 outline-none transition-all duration-300 resize-none" />
                </div>
              </div>
              <button type="submit" disabled={status === 'loading'} className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-accent text-accent-foreground font-bold text-lg hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed">
                {status === 'loading' ? (<><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>) : (<><Send className="w-5 h-5" /> Send Message</>)}
              </button>
              {status === 'success' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400">
                  <CheckCircle className="w-5 h-5 shrink-0" />
                  <span className="text-sm font-medium">Message sent successfully! I&apos;ll get back to you soon.</span>
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span className="text-sm font-medium">{errorMessage}</span>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
