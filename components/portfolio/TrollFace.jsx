import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TROLL_NORMAL = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69278106edd6d62b09d18fcb/44510ffc2_image.png";
const TROLL_FROWN = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69278106edd6d62b09d18fcb/695a3797c_image.png";

export default function TrollFace() {
    const [isFrowning, setIsFrowning] = useState(false);
    const [clickCount, setClickCount] = useState(0);

    const handleClick = () => {
        setIsFrowning(true);
        setClickCount(prev => prev + 1);
        setTimeout(() => setIsFrowning(false), 1500);
    };

    const messages = [
        "problem?",
        "u mad bro?",
        "remember me?",
        "brah",
        "troll",
        "umad XD"
    ];

    return (
        <motion.div
            onClick={handleClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative cursor-pointer select-none group"
        >
            <motion.img
                src={isFrowning ? TROLL_FROWN : TROLL_NORMAL}
                alt="Troll Face"
                className="w-28 h-28 object-contain"
                animate={isFrowning ? { rotate: [0, -5, 5, 0] } : {}}
                transition={{ duration: 0.3 }}
            />
            
            {/* Speech bubble */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={isFrowning ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 10 }}
                className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap"
            >
                {messages[clickCount % messages.length]}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-black rotate-45" />
            </motion.div>
            
            <p className="text-center mt-2 text-xs text-gray-400 font-mono">trolled</p>
        </motion.div>
    );
}