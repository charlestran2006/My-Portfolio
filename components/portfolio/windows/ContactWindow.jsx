import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Github, Linkedin, Twitter } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactWindow() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSending, setIsSending] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSending(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast.success("Message sent! I'll get back to you soon 📧");
        setFormData({ name: '', email: '', message: '' });
        setIsSending(false);
    };

    const socialLinks = [
        { icon: Github, label: 'GitHub', href: '#', color: 'hover:text-gray-900' },
        { icon: Linkedin, label: 'LinkedIn', href: '#', color: 'hover:text-blue-600' },
        { icon: Twitter, label: 'Twitter', href: '#', color: 'hover:text-sky-500' },
        { icon: Mail, label: 'Email', href: 'mailto:hello@example.com', color: 'hover:text-red-500' },
    ];

    return (
        <div className="h-full overflow-auto p-6 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="max-w-md mx-auto">
                <div className="text-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Get In Touch</h2>
                    <p className="text-gray-500 text-sm mt-1">I'd love to hear from you!</p>
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-3 mb-6">
                    {socialLinks.map((social, i) => (
                        <motion.a
                            key={i}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className={`w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-400 transition-colors shadow-sm ${social.color}`}
                        >
                            <social.icon className="w-5 h-5" />
                        </motion.a>
                    ))}
                </div>

                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Name</label>
                        <input
                            type="text"
                            placeholder="Your name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Message</label>
                        <textarea
                            placeholder="What's on your mind?"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            required
                        />
                    </div>
                    <motion.button
                        type="submit"
                        disabled={isSending}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {isSending ? (
                            <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>⏳</motion.span>
                        ) : (
                            <>
                                <Send className="w-4 h-4" />
                                Send Message
                            </>
                        )}
                    </motion.button>
                </form>
            </div>
        </div>
    );
}