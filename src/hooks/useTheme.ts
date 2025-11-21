import { useEffect } from 'react';
import type { Theme } from '../types';

export const useTheme = (theme: Theme) => {
    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--color-bg-gradient-start', theme.colors.bgGradientStart);
        root.style.setProperty('--color-bg-gradient-mid', theme.colors.bgGradientMid);
        root.style.setProperty('--color-bg-gradient-end', theme.colors.bgGradientEnd);
        root.style.setProperty('--color-primary', theme.colors.primary);
        root.style.setProperty('--color-secondary', theme.colors.secondary);
        root.style.setProperty('--color-accent', theme.colors.accent);
        root.style.setProperty('--color-text-main', theme.colors.textMain);
        root.style.setProperty('--color-text-muted', theme.colors.textMuted);
        root.style.setProperty('--color-text-dim', theme.colors.textDim);
        root.style.setProperty('--glass-bg', theme.colors.glassBg);
        root.style.setProperty('--glass-border', theme.colors.glassBorder);
        root.style.setProperty('--glass-shadow', theme.colors.glassShadow);
    }, [theme]);
};
