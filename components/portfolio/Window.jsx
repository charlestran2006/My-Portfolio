import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Minus, Square } from 'lucide-react';

export default function Window({ 
    title, 
    icon,
    children, 
    isOpen, 
    onClose, 
    onMinimize,
    onFocus,
    zIndex,
    defaultPosition = { x: 100, y: 50 },
    defaultSize = { width: 600, height: 400 }
}) {
    const [position, setPosition] = useState(defaultPosition);
    const [isDragging, setIsDragging] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);
    const dragRef = useRef(null);
    const dragStartPos = useRef({ x: 0, y: 0 });

    const handleMouseDown = (e) => {
        if (isMaximized) return;
        setIsDragging(true);
        dragStartPos.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y
        };
        onFocus?.();
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        setPosition({
            x: e.clientX - dragStartPos.current.x,
            y: Math.max(0, e.clientY - dragStartPos.current.y)
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    React.useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [isDragging]);

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute"
            style={{
                left: isMaximized ? 0 : position.x,
                top: isMaximized ? 0 : position.y,
                width: isMaximized ? '100%' : defaultSize.width,
                height: isMaximized ? 'calc(100% - 48px)' : defaultSize.height,
                zIndex: zIndex
            }}
            onClick={onFocus}
        >
            <div className="h-full flex flex-col rounded-lg overflow-hidden shadow-2xl border border-blue-400/50"
                style={{
                    background: 'linear-gradient(180deg, rgba(50,100,180,0.95) 0%, rgba(30,60,120,0.95) 100%)'
                }}
            >
                {/* Title Bar */}
                <div 
                    ref={dragRef}
                    onMouseDown={handleMouseDown}
                    className="h-8 flex items-center justify-between px-2 cursor-move select-none"
                    style={{
                        background: 'linear-gradient(180deg, rgba(180,200,240,0.3) 0%, rgba(100,140,200,0.1) 50%, rgba(50,80,140,0.2) 100%)'
                    }}
                >
                    <div className="flex items-center gap-2">
                        {icon && <span className="text-sm">{icon}</span>}
                        <span className="text-white text-sm font-medium drop-shadow-md">{title}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <button 
                            onClick={(e) => { e.stopPropagation(); onMinimize?.(); }}
                            className="w-6 h-5 rounded-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                        >
                            <Minus className="w-3 h-3 text-white" />
                        </button>
                        <button 
                            onClick={(e) => { e.stopPropagation(); setIsMaximized(!isMaximized); }}
                            className="w-6 h-5 rounded-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                        >
                            <Square className="w-2.5 h-2.5 text-white" />
                        </button>
                        <button 
                            onClick={(e) => { e.stopPropagation(); onClose?.(); }}
                            className="w-6 h-5 rounded-sm flex items-center justify-center hover:bg-red-500 transition-colors"
                        >
                            <X className="w-3 h-3 text-white" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 bg-white overflow-auto">
                    {children}
                </div>
            </div>
        </motion.div>
    );
}