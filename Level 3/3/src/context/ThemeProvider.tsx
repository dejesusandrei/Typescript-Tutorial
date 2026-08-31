import { useState, type ReactNode } from "react";
import type { ThemeContextValue } from "../types/ThemeContextValue";
import { ThemeContext } from './ThemeContext'

export default function ThemeProvider({ children }: { children: ReactNode}) {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    const toggleTheme = () =>{
        setTheme(prev => prev === "light" ? "dark" : "light");
        console.log(theme);
    }

    const value: ThemeContextValue = {
        theme,
        toggleTheme
    }
    return(
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}