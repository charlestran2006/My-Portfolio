import React, { useState } from 'react';
import { motion } from 'framer-motion';

const DOGE_IMAGE = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69278106edd6d62b09d18fcb/5dd2610fb_image.png";

export default function SpinningDogeHead() {
    const [isSpinning, setIsSpinning] = useState(false);
    const [wowCount, setWowCount] = useState(0);

    const handleClick = () => {
        setIsSpinning(true);
        setWowCount(prev => prev + 1);
        setTimeout(() => setIsSpinning(false), 1000);
    };

    const wowTexts = ['wow', 'such spin', 'very click', 'much amaze', 'such portfolio'];

    return (
        <div className="relative">
            <motion.img
                src={DOGE_IMAGE}
                alt="Doge"
                onClick={handleClick}
                animate={isSpinning ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                whileHover={{ scale: 1.1 }}
                className="w-28 h-28 object-contain cursor-pointer select-none"
            />

            {/* Floating wow texts */}
            {isSpinning && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute -top-8 left-1/2 -translate-x-1/2 text-sm font-bold text-yellow-500 whitespace-nowrap"
                    style={{ fontFamily: 'Comic Sans MS, cursive' }}
                >
                    {wowTexts[wowCount % wowTexts.length]}
                </motion.div>
            )}
            
            <p className="text-center mt-2 text-xs text-gray-400 font-mono">much doge</p>
        </div>
    );
}