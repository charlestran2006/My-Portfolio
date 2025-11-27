import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Taskbar({ openWindows, onWindowClick, onStartClick, isStartOpen }) {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="absolute bottom-0 left-0 right-0 h-10 flex items-center px-1 z-50"
            style={{
                background: 'linear-gradient(180deg, rgba(70,130,180,0.85) 0%, rgba(40,80,130,0.92) 40%, rgba(25,55,95,0.95) 100%)',
                borderTop: '1px solid rgba(180,210,240,0.4)',
                backdropFilter: 'blur(10px)'
            }}
        >
            {/* Start Button - Windows 7 Orb */}
            <motion.button
                onClick={onStartClick}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-12 h-12 -mt-2 mr-2 flex items-center justify-center"
                style={{ zIndex: 60 }}
            >
                <div 
                    className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-150 ${
                        isStartOpen ? 'brightness-125' : 'hover:brightness-110'
                    }`}
                    style={{
                        background: 'radial-gradient(ellipse at 30% 20%, #7EB5E5 0%, #4A9CD6 25%, #2171B5 50%, #1A5C99 75%, #0F3D6B 100%)',
                        boxShadow: isStartOpen 
                            ? '0 0 15px 3px rgba(100,180,255,0.6), inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -2px 4px rgba(0,0,0,0.3)'
                            : '0 2px 8px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.2)',
                        border: '1px solid rgba(100,160,220,0.5)'
                    }}
                >
                    {/* Windows Logo */}
                    <div className="grid grid-cols-2 gap-0.5 w-5 h-5">
                        <div className="bg-gradient-to-br from-red-400 to-red-600 rounded-tl-sm" style={{ boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4)' }} />
                        <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-tr-sm" style={{ boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4)' }} />
                        <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-bl-sm" style={{ boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4)' }} />
                        <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-br-sm" style={{ boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4)' }} />
                    </div>
                </div>
                {/* Shine overlay */}
                <div 
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-9 h-5 rounded-t-full opacity-30"
                    style={{
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 100%)'
                    }}
                />
            </motion.button>

            {/* Quick Launch Separator */}
            <div className="w-px h-6 bg-white/20 mx-2" />

            {/* Open Windows */}
            <div className="flex-1 flex items-center gap-1 overflow-x-auto px-1">
                <AnimatePresence>
                    {openWindows.map((window) => (
                        <motion.button
                            key={window.id}
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 'auto', opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            onClick={() => onWindowClick(window.id)}
                            className={`h-8 px-3 rounded flex items-center gap-2 min-w-[140px] max-w-[200px] transition-all ${
                                window.isMinimized 
                                    ? 'bg-white/10 hover:bg-white/20' 
                                    : 'bg-gradient-to-b from-white/30 to-white/10'
                            }`}
                            style={{
                                boxShadow: window.isMinimized 
                                    ? 'none' 
                                    : 'inset 0 1px 0 rgba(255,255,255,0.3), 0 1px 3px rgba(0,0,0,0.2)',
                                border: window.isMinimized ? '1px solid transparent' : '1px solid rgba(255,255,255,0.2)'
                            }}
                        >
                            <span className="text-lg">{window.icon}</span>
                            <span className="text-white text-xs truncate">{window.title}</span>
                        </motion.button>
                    ))}
                </AnimatePresence>
            </div>

            {/* System Tray */}
            <div className="flex items-center gap-2 px-3 h-full"
                style={{
                    background: 'linear-gradient(180deg, rgba(40,80,140,0.9) 0%, rgba(20,50,100,0.9) 100%)',
                    borderLeft: '1px solid rgba(100,140,200,0.3)'
                }}
            >
                <span className="text-white/60 text-lg">🔊</span>
                <span className="text-white/60 text-lg">📶</span>
                <div className="text-right">
                    <div className="text-white text-xs">
                        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div className="text-white/70 text-[10px]">
                        {time.toLocaleDateString()}
                    </div>
                </div>
            </div>
        </div>
    );
}