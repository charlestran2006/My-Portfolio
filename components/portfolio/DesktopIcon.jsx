import React from 'react';
import { motion } from 'framer-motion';

export default function DesktopIcon({ icon, label, onClick, isSelected, onSelect }) {
    return (
        <motion.div
            onClick={(e) => {
                e.stopPropagation();
                onSelect?.();
            }}
            onDoubleClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex flex-col items-center justify-center w-20 h-24 cursor-pointer select-none rounded-sm p-2 ${
                isSelected ? 'bg-blue-500/40 border border-blue-400/60' : 'hover:bg-white/10'
            }`}
        >
            <div className="text-4xl mb-1 drop-shadow-lg">
                {icon}
            </div>
            <span className="text-white text-xs text-center leading-tight drop-shadow-md font-medium px-1"
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
            >
                {label}
            </span>
        </motion.div>
    );
}