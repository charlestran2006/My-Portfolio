import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, Send, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function ContactSection() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSending, setIsSending] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSending(true);
        
        // Simulate sending
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        toast.success("Message sent! I'll get back to you soon 🚀");
        setFormData({ name: '', email: '', message: '' });
        setIsSending(false);
    };

    const socialLinks = [
        { icon: Github, href: '#', label: 'GitHub', color: 'hover:text-gray-900' },
        { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:text-blue-600' },
        { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-sky-500' },
        { icon: Mail, href: 'mailto:hello@example.com', label: 'Email', color: 'hover:text-red-500' },
    ];

    return (
        <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left side - Info */}
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
            >
                <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-3">
                        Let's Create Something
                        <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"> Amazing</span>
                    </h3>
                    <p className="text-gray-500 leading-relaxed">
                        Got a project in mind? Want to collaborate? Or just want to say hi? 
                        I'd love to hear from you! Drop me a message and let's make the internet a more fun place together.
                    </p>
                </div>

                {/* Social Links */}
                <div className="flex gap-3">
                    {socialLinks.map((social, i) => (
                        <motion.a
                            key={i}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className={`w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 transition-colors ${social.color}`}
                        >
                            <social.icon className="w-5 h-5" />
                        </motion.a>
                    ))}
                </div>

                {/* Fun fact */}
                <motion.div
                    className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100"
                    whileHover={{ scale: 1.02 }}
                >
                    <div className="flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-indigo-500 mt-0.5" />
                        <div>
                            <p className="text-sm font-medium text-indigo-900">Fun fact</p>
                            <p className="text-sm text-indigo-600">
                                I've clicked on Nyan Cat approximately 1,337 times during the making of this portfolio.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Right side - Form */}
            <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
            >
                <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1.5 block">Name</label>
                        <Input
                            placeholder="Your name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1.5 block">Email</label>
                        <Input
                            type="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                            required
                        />
                    </div>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">Message</label>
                    <Textarea
                        placeholder="What's on your mind?"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="bg-gray-50 border-gray-200 focus:bg-white transition-colors min-h-[120px] resize-none"
                        required
                    />
                </div>
                <Button
                    type="submit"
                    disabled={isSending}
                    className="w-full bg-gray-900 hover:bg-gray-800 h-11"
                >
                    {isSending ? (
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1 }}
                        >
                            ⏳
                        </motion.div>
                    ) : (
                        <>
                            <Send className="w-4 h-4 mr-2" />
                            Send Message
                        </>
                    )}
                </Button>
            </motion.form>
        </div>
    );
}