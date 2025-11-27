import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NyanCat() {
    const [rainbows, setRainbows] = useState([]);
    const [isNyaning, setIsNyaning] = useState(false);

    const shootRainbow = () => {
        setIsNyaning(true);
        const newRainbow = {
            id: Date.now(),
            colors: ['#ff0000', '#ff9900', '#ffff00', '#33ff00', '#0099ff', '#6633ff']
        };
        setRainbows(prev => [...prev, newRainbow]);
        
        setTimeout(() => {
            setRainbows(prev => prev.filter(r => r.id !== newRainbow.id));
        }, 1500);
        
        setTimeout(() => setIsNyaning(false), 300);
    };

    return (
        <div className="relative flex items-center justify-center py-8">
            {/* Rainbow Trail */}
            <AnimatePresence>
                {rainbows.map((rainbow) => (
                    <motion.div
                        key={rainbow.id}
                        initial={{ width: 0, opacity: 1 }}
                        animate={{ width: 300, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute right-1/2 mr-12 h-16 flex flex-col overflow-hidden rounded-l-full"
                        style={{ transformOrigin: 'right center' }}
                    >
                        {rainbow.colors.map((color, i) => (
                            <motion.div
                                key={i}
                                className="flex-1"
                                style={{ backgroundColor: color }}
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: i * 0.02, duration: 0.6 }}
                            />
                        ))}
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* Nyan Cat */}
            <motion.div
                onClick={shootRainbow}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={isNyaning ? { x: [0, 10, 0] } : {}}
                transition={{ duration: 0.1 }}
                className="relative cursor-pointer select-none z-10"
            >
                <motion.img 
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69278106edd6d62b09d18fcb/6545b2db5_image.png"
                    alt="Nyan Cat"
                    className="w-32 h-auto"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 0.3 }}
                />
                
                {/* Stars around when clicked */}
                <AnimatePresence>
                    {isNyaning && (
                        <>
                            {[...Array(6)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0, opacity: 1 }}
                                    animate={{ 
                                        scale: [0, 1, 0],
                                        x: (Math.random() - 0.5) * 100,
                                        y: (Math.random() - 0.5) * 100
                                    }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute top-1/2 left-1/2 text-yellow-400 text-xl"
                                >
                                    ✦
                                </motion.div>
                            ))}
                        </>
                    )}
                </AnimatePresence>
            </motion.div>
            
            <p className="absolute -bottom-2 text-xs text-gray-400 font-mono">nyancat</p>
        </div>
    );
}