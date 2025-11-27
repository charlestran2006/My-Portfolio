import React from 'react';
import { motion } from 'framer-motion';

const BANANA_IMAGE = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69278106edd6d62b09d18fcb/d647539b8_image.png";

export default function DancingBanana() {
    return (
        <motion.img
            src={BANANA_IMAGE}
            alt="Dancing Banana"
            className="w-20 h-auto cursor-pointer select-none"
            animate={{
                rotate: [0, -10, 10, -10, 10, 0],
                y: [0, -10, 0, -10, 0]
            }}
            transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatDelay: 0.2
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9, rotate: 360 }}
        />
    );
}