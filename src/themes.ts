import type { Theme } from './types';

export const themes: Theme[] = [
    {
        id: 'nebula',
        name: 'Nebula',
        colors: {
            bgGradientStart: '#050414', // Darker
            bgGradientMid: '#1a1638',   // Darker
            bgGradientEnd: '#121224',   // Darker
            primary: '#8a76b8',         // Less saturated
            secondary: '#e0b0d0',       // Less saturated
            accent: '#00b4db',          // Less saturated
            textMain: '#e6e6e6',        // Slightly softer white
            textMuted: 'rgba(255, 255, 255, 0.6)',
            textDim: 'rgba(255, 255, 255, 0.3)',
            glassBg: 'rgba(0, 0, 0, 0.2)', // Darker glass
            glassBorder: 'rgba(255, 255, 255, 0.05)',
            glassShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
        },
    },
    {
        id: 'sunset',
        name: 'Sunset',
        colors: {
            bgGradientStart: '#1a0833', // Darker
            bgGradientMid: '#4a5d8a',   // Darker/Desaturated
            bgGradientEnd: '#8a5a5c',   // Darker/Desaturated
            primary: '#d67c80',         // Less saturated
            secondary: '#d6b0a8',       // Less saturated
            accent: '#e0b0e0',          // Less saturated
            textMain: '#e6e6e6',
            textMuted: 'rgba(255, 255, 255, 0.7)',
            textDim: 'rgba(255, 255, 255, 0.4)',
            glassBg: 'rgba(0, 0, 0, 0.3)',
            glassBorder: 'rgba(255, 255, 255, 0.1)',
            glassShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
        },
    },
    {
        id: 'forest',
        name: 'Forest',
        colors: {
            bgGradientStart: '#0a2e38', // Darker
            bgGradientMid: '#1e4235',   // Darker
            bgGradientEnd: '#3d6146',   // Darker
            primary: '#5a8f66',         // Less saturated
            secondary: '#8ab85c',       // Less saturated
            accent: '#428524',          // Less saturated
            textMain: '#e6e6e6',
            textMuted: 'rgba(255, 255, 255, 0.7)',
            textDim: 'rgba(255, 255, 255, 0.4)',
            glassBg: 'rgba(0, 0, 0, 0.3)',
            glassBorder: 'rgba(255, 255, 255, 0.1)',
            glassShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
        },
    },
    {
        id: 'ocean',
        name: 'Ocean',
        colors: {
            bgGradientStart: '#0d1440', // Darker
            bgGradientMid: '#136867',   // Darker
            bgGradientEnd: '#0d1440',   // Darker
            primary: '#1e8f8e',         // Less saturated
            secondary: '#0d1440',
            accent: '#008fb3',          // Less saturated
            textMain: '#e6e6e6',
            textMuted: 'rgba(255, 255, 255, 0.7)',
            textDim: 'rgba(255, 255, 255, 0.4)',
            glassBg: 'rgba(0, 0, 0, 0.3)',
            glassBorder: 'rgba(255, 255, 255, 0.1)',
            glassShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
        },
    },
    {
        id: 'midnight',
        name: 'Midnight',
        colors: {
            bgGradientStart: '#000000',
            bgGradientMid: '#1a1a1a',   // Slightly lighter than black for subtle gradient
            bgGradientEnd: '#000000',
            primary: '#808080',
            secondary: '#4d4d4d',
            accent: '#a6a6a6',
            textMain: '#cccccc',        // Dimmer white
            textMuted: 'rgba(255, 255, 255, 0.5)',
            textDim: 'rgba(255, 255, 255, 0.3)',
            glassBg: 'rgba(255, 255, 255, 0.02)',
            glassBorder: 'rgba(255, 255, 255, 0.03)',
            glassShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.8)',
        },
    },
];
