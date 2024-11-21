import { createContext, useState } from "react";

// Create a context with a default value of "light"
const ThemeContext = createContext("light");

// Create a ThemeProvider component that wraps its children in the ThemeContext.Provider
const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");

    return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export { ThemeContext, ThemeProvider };
