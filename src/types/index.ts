/**
 * Shared type definitions for Nebula application
 */

export type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

export interface Settings {
    timerDurations: {
        focus: number;
        shortBreak: number;
        longBreak: number;
    };
    themeId: string;
    soundEnabled: boolean;
    autoStart: boolean;
}

export interface Stats {
    sessionsCompleted: number;
    totalMinutes: number;
}

export interface Theme {
    id: string;
    name: string;
    colors: {
        bgGradientStart: string;
        bgGradientMid: string;
        bgGradientEnd: string;
        primary: string;
        secondary: string;
        accent: string;
        textMain: string;
        textMuted: string;
        textDim: string;
        glassBg: string;
        glassBorder: string;
        glassShadow: string;
    };
}

export interface Task {
    id: string;
    text: string;
    completed: boolean;
    category: 'Work' | 'Personal' | 'Urgent' | 'Other';
}
