import { createContext, useCallback, useContext, useState } from "react";

const checkDefaultTheme = () => {
  const darkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", darkTheme);
  return darkTheme;
};

type State = {
  darkTheme: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<State | undefined>(undefined);

type ThemeProviderProps = {
  children: React.ReactNode;
};

export const ThemeContextProvider: React.FC<ThemeProviderProps> = (props) => {
  const [darkTheme, setDarkTheme] = useState<State["darkTheme"]>(
    checkDefaultTheme()
  ); // indexed access types

  const state: State = {
    darkTheme,
    toggleTheme: useCallback(
      () =>
        setDarkTheme((prev) => {
          const newTheme = !prev;
          // pure JS
          document.body.classList.toggle("dark-theme", newTheme);

          // save mode to local storage
          localStorage.setItem("darkTheme", newTheme.toString());
          return newTheme;
        }),
      []
    ),
  };

  return (
    <ThemeContext.Provider value={state}>
      {props.children}
    </ThemeContext.Provider>
  );
};

// custom hook
// eslint-disable-next-line react-refresh/only-export-components
export const useThemeContext = () => {
  const ctx = useContext(ThemeContext);

  // Necessary 'IF' if no def. value is provided above
  if (!ctx) {
    throw new Error("Component beyond Theme Context"); // this solves syntax problems !!
  }

  return ctx;
};
