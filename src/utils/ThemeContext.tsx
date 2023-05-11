import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
} from 'react';

type ThemeContextType = {
  darkTheme: boolean,
  setDarkTheme: Dispatch<SetStateAction<boolean>>,
};

export const ThemeContext = createContext<ThemeContextType>({
  darkTheme: false,
  setDarkTheme: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);