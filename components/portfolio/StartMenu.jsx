import React from 'react';
import { motion } from 'framer-motion';
import { Power, User, FolderOpen, Settings, Search } from 'lucide-react';

export default function StartMenu({ isOpen, onClose, onOpenWindow, apps }) {
    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div className="fixed inset-0 z-40" onClick={onClose} />
            
            {/* Menu */}
            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute bottom-10 left-0 w-[380px] rounded-t-md overflow-hidden z-50"
                style={{
                    background: 'linear-gradient(180deg, rgba(240,245,250,0.98) 0%, rgba(220,230,245,0.98) 100%)',
                    boxShadow: '0 0 20px rgba(0,0,0,0.5), 0 0 1px rgba(0,0,0,0.8)',
                    border: '1px solid rgba(100,150,200,0.6)'
                }}
            >
                {/* User Section */}
                <div className="flex items-center gap-3 p-3 border-b border-gray-300/50"
                    style={{
                        background: 'linear-gradient(180deg, rgba(220,235,250,1) 0%, rgba(200,220,245,1) 100%)'
                    }}
                >
                    <div className="w-12 h-12 rounded-sm bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center border-2 border-white shadow-md">
                        <User className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-gray-800 font-semibold text-sm">Hello There, User!</span>
                </div>

                {/* Two Column Layout */}
                <div className="flex">
                    {/* Left - Programs (white background) */}
                    <div className="flex-1 p-2 bg-white">
                        {apps.map((app) => (
                            <button
                                key={app.id}
                                onClick={() => { onOpenWindow(app.id); onClose(); }}
                                className="w-full flex items-center gap-3 px-2 py-1.5 rounded hover:bg-blue-100 transition-colors group"
                            >
                                <span className="text-xl">{app.icon}</span>
                                <span className="text-gray-800 text-sm group-hover:text-blue-700">{app.title}</span>
                            </button>
                        ))}
                        <div className="border-t border-gray-200 mt-2 pt-2">
                            <button className="w-full flex items-center gap-3 px-2 py-1.5 rounded hover:bg-blue-100 text-gray-600 text-sm">
                                <span className="text-lg">📂</span>
                                All Programs
                                <span className="ml-auto text-gray-400">▶</span>
                            </button>
                        </div>
                        {/* Search Box */}
                        <div className="mt-2 pt-2 border-t border-gray-200">
                            <div className="flex items-center gap-2 px-2 py-1.5 bg-white border border-gray-300 rounded">
                                <Search className="w-4 h-4 text-gray-400" />
                                <input 
                                    type="text" 
                                    placeholder="Search programs and files"
                                    className="flex-1 text-xs text-gray-600 outline-none bg-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right - Quick Links (blue background) */}
                    <div className="w-44 p-2"
                        style={{
                            background: 'linear-gradient(180deg, rgba(200,220,245,1) 0%, rgba(180,205,235,1) 100%)'
                        }}
                    >
                        {[
                            { icon: '📄', label: 'Documents' },
                            { icon: '🖼️', label: 'Pictures' },
                            { icon: '🎵', label: 'Music' },
                            { icon: '🎮', label: 'Games' },
                            { icon: '💻', label: 'Computer' },
                        ].map((item, i) => (
                            <button
                                key={i}
                                className="w-full flex items-center gap-2 px-2 py-1 rounded hover:bg-blue-200/50 transition-colors text-gray-700 text-xs"
                            >
                                <span>{item.icon}</span>
                                {item.label}
                            </button>
                        ))}
                        <div className="border-t border-blue-300/50 my-2" />
                        {[
                            { icon: <Settings className="w-3.5 h-3.5" />, label: 'Control Panel' },
                            { icon: <FolderOpen className="w-3.5 h-3.5" />, label: 'Default Programs' },
                        ].map((item, i) => (
                            <button
                                key={i}
                                className="w-full flex items-center gap-2 px-2 py-1 rounded hover:bg-blue-200/50 transition-colors text-gray-700 text-xs"
                            >
                                {item.icon}
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex items-center justify-end gap-1 p-2 border-t border-gray-300/50"
                    style={{
                        background: 'linear-gradient(180deg, rgba(200,215,235,1) 0%, rgba(180,200,225,1) 100%)'
                    }}
                >
                    <button className="flex items-center gap-2 px-4 py-1.5 rounded hover:bg-blue-200/50 transition-colors text-gray-700 text-sm font-medium"
                        style={{
                            background: 'linear-gradient(180deg, rgba(240,245,250,1) 0%, rgba(210,220,235,1) 100%)',
                            border: '1px solid rgba(150,170,200,0.6)',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                        }}
                    >
                        Shut down
                    </button>
                    <button className="px-1.5 py-1.5 rounded hover:bg-blue-200/50 transition-colors text-gray-600"
                        style={{
                            background: 'linear-gradient(180deg, rgba(240,245,250,1) 0%, rgba(210,220,235,1) 100%)',
                            border: '1px solid rgba(150,170,200,0.6)',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                        }}
                    >
                        I see you!
                    </button>
                </div>
            </motion.div>
        </>
    );
}