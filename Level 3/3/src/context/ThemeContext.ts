import { createContext } from "react";
import type { ThemeContextValue } from '../types/ThemeContextValue'

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);