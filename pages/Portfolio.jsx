import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Window from '@/components/portfolio/Window';
import DesktopIcon from '@/components/portfolio/DesktopIcon';
import Taskbar from '@/components/portfolio/Taskbar';
import StartMenu from '@/components/portfolio/StartMenu';
import AboutMeWindow from '@/components/portfolio/windows/AboutMeWindow';
import ProjectsWindow from '@/components/portfolio/windows/ProjectsWindow';
import FunZoneWindow from '@/components/portfolio/windows/FunZoneWindow';
import ContactWindow from '@/components/portfolio/windows/ContactWindow';

// Windows 7 wallpaper
const WALLPAPER_URL = '/windows7.jpg';

const apps = [
    { id: 'about', title: 'About Me', icon: '👤', component: AboutMeWindow, defaultPos: { x: 80, y: 40 }, defaultSize: { width: 650, height: 450 } },
    { id: 'projects', title: 'My Projects', icon: '📁', component: ProjectsWindow, defaultPos: { x: 150, y: 80 }, defaultSize: { width: 550, height: 420 } },
    { id: 'funzone', title: 'Fun Zone', icon: '🎮', component: FunZoneWindow, defaultPos: { x: 200, y: 60 }, defaultSize: { width: 520, height: 500 } },
    { id: 'contact', title: 'Contact Me', icon: '📧', component: ContactWindow, defaultPos: { x: 250, y: 100 }, defaultSize: { width: 450, height: 480 } },
];

const desktopIcons = [
    { id: 'about', icon: '👤', label: 'About Me' },
    { id: 'projects', icon: '📁', label: 'My Projects' },
    { id: 'funzone', icon: '🎮', label: 'Fun Zone' },
    { id: 'contact', icon: '📧', label: 'Contact Me' },
    { id: 'recycle', icon: '🗑️', label: 'Recycle Bin' },
];

export default function Portfolio() {
    const [windows, setWindows] = useState([]);
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [isStartOpen, setIsStartOpen] = useState(false);
    const [highestZ, setHighestZ] = useState(10);

    const openWindow = (appId) => {
        const existingWindow = windows.find(w => w.id === appId);
        if (existingWindow) {
            // If minimized, restore it
            if (existingWindow.isMinimized) {
                setWindows(windows.map(w => 
                    w.id === appId ? { ...w, isMinimized: false, zIndex: highestZ + 1 } : w
                ));
                setHighestZ(highestZ + 1);
            } else {
                // Bring to front
                focusWindow(appId);
            }
            return;
        }

        const app = apps.find(a => a.id === appId);
        if (!app) return;

        setHighestZ(highestZ + 1);
        setWindows([...windows, {
            id: appId,
            title: app.title,
            icon: app.icon,
            component: app.component,
            defaultPos: app.defaultPos,
            defaultSize: app.defaultSize,
            isMinimized: false,
            zIndex: highestZ + 1
        }]);
    };

    const closeWindow = (appId) => {
        setWindows(windows.filter(w => w.id !== appId));
    };

    const minimizeWindow = (appId) => {
        setWindows(windows.map(w => 
            w.id === appId ? { ...w, isMinimized: true } : w
        ));
    };

    const focusWindow = (appId) => {
        setHighestZ(highestZ + 1);
        setWindows(windows.map(w => 
            w.id === appId ? { ...w, zIndex: highestZ + 1, isMinimized: false } : w
        ));
    };

    const handleTaskbarClick = (appId) => {
        const window = windows.find(w => w.id === appId);
        if (window?.isMinimized) {
            focusWindow(appId);
        } else {
            minimizeWindow(appId);
        }
    };

    const handleDesktopClick = () => {
        setSelectedIcon(null);
        setIsStartOpen(false);
    };

    return (
        <div 
            className="h-screen w-screen overflow-hidden relative select-none"
            style={{ 
                backgroundImage: `url(${WALLPAPER_URL})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
            onClick={handleDesktopClick}
        >
            {/* Desktop Icons */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
                {desktopIcons.map((icon) => (
                    <DesktopIcon
                        key={icon.id}
                        icon={icon.icon}
                        label={icon.label}
                        isSelected={selectedIcon === icon.id}
                        onSelect={() => setSelectedIcon(icon.id)}
                        onClick={() => openWindow(icon.id)}
                    />
                ))}
            </div>

            {/* Windows */}
            <AnimatePresence>
                {windows.map((window) => {
                    const WindowContent = window.component;
                    return (
                        <Window
                            key={window.id}
                            title={window.title}
                            icon={window.icon}
                            isOpen={!window.isMinimized}
                            onClose={() => closeWindow(window.id)}
                            onMinimize={() => minimizeWindow(window.id)}
                            onFocus={() => focusWindow(window.id)}
                            zIndex={window.zIndex}
                            defaultPosition={window.defaultPos}
                            defaultSize={window.defaultSize}
                        >
                            <WindowContent />
                        </Window>
                    );
                })}
            </AnimatePresence>

            {/* Start Menu */}
            <AnimatePresence>
                {isStartOpen && (
                    <StartMenu
                        isOpen={isStartOpen}
                        onClose={() => setIsStartOpen(false)}
                        onOpenWindow={openWindow}
                        apps={apps}
                    />
                )}
            </AnimatePresence>

            {/* Taskbar */}
            <Taskbar
                openWindows={windows}
                onWindowClick={handleTaskbarClick}
                onStartClick={(e) => {
                    e.stopPropagation();
                    setIsStartOpen(!isStartOpen);
                }}
                isStartOpen={isStartOpen}
            />
        </div>
    );
}