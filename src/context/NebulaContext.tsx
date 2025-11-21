import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { themes } from '../themes';
import type { Theme, Settings, Stats } from '../types';
import { useTheme } from '../hooks/useTheme';

interface NebulaContextType {
    settings: Settings;
    stats: Stats;
    updateSettings: (newSettings: Partial<Settings>) => void;
    incrementStats: (minutes: number) => void;
    currentTheme: Theme;
}

const defaultSettings: Settings = {
    timerDurations: {
        focus: 25 * 60,
        shortBreak: 5 * 60,
        longBreak: 15 * 60,
    },
    themeId: 'nebula',
    soundEnabled: true,
};

const defaultStats: Stats = {
    sessionsCompleted: 0,
    totalMinutes: 0,
};

const NebulaContext = createContext<NebulaContextType | undefined>(undefined);

export const NebulaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [settings, setSettings] = useState<Settings>(() => {
        try {
            const saved = localStorage.getItem('nebula-settings');
            if (!saved) return defaultSettings;

            const parsed = JSON.parse(saved);

            // Migration: If themeColor exists but themeId doesn't, default to 'nebula'
            const themeId = parsed.themeId || 'nebula';

            return {
                ...defaultSettings,
                ...parsed,
                themeId,
                timerDurations: {
                    ...defaultSettings.timerDurations,
                    ...(parsed.timerDurations || {})
                }
            };
        } catch (error) {
            console.error('Failed to parse settings from localStorage:', error);
            localStorage.removeItem('nebula-settings');
            return defaultSettings;
        }
    });

    const [stats, setStats] = useState<Stats>(() => {
        try {
            const saved = localStorage.getItem('nebula-stats');
            return saved ? JSON.parse(saved) : defaultStats;
        } catch (error) {
            console.error('Failed to parse stats from localStorage:', error);
            localStorage.removeItem('nebula-stats');
            return defaultStats;
        }
    });

    const currentTheme = themes.find(t => t.id === settings.themeId) || themes[0];

    useTheme(currentTheme);

    useEffect(() => {
        localStorage.setItem('nebula-settings', JSON.stringify(settings));
    }, [settings]);

    useEffect(() => {
        localStorage.setItem('nebula-stats', JSON.stringify(stats));
    }, [stats]);

    const updateSettings = (newSettings: Partial<Settings>) => {
        setSettings(prev => ({ ...prev, ...newSettings }));
    };

    const incrementStats = (minutes: number) => {
        setStats(prev => ({
            sessionsCompleted: prev.sessionsCompleted + 1,
            totalMinutes: prev.totalMinutes + minutes,
        }));
    };

    return (
        <NebulaContext.Provider value={{ settings, stats, updateSettings, incrementStats, currentTheme }}>
            {children}
        </NebulaContext.Provider>
    );
};

export const useNebula = () => {
    const context = useContext(NebulaContext);
    if (context === undefined) {
        throw new Error('useNebula must be used within a NebulaProvider');
    }
    return context;
};
