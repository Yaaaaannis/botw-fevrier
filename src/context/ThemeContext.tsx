import { createContext, useContext } from 'react';

export type LayoutType = 'hiphop' | 'modern';

interface ThemeContextType {
    theme: LayoutType;
    switchTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: 'modern',
    switchTheme: () => { },
});

export const useTheme = () => useContext(ThemeContext);
