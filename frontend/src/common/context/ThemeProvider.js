import { createContext, useState, useEffect } from "react";

// context
import { useAuth } from "./AuthContext";

// Localstorage key
const LOCAL_STORAGE_KEY = "senior-todo-user-theme";

// Create a context with a default value of "light"
const ThemeContext = createContext("light");

// Create a ThemeProvider component that wraps its children in the ThemeContext.Provider
const ThemeProvider = ({ children }) => {
    const { user } = useAuth();
    const [theme, setTheme] = useState(localStorage.getItem(LOCAL_STORAGE_KEY) || "light");

    useEffect(() => {
        if (user) {
            setTheme(user.theme);
        }
    }, []);

    useEffect(() => {
        if (user) {
            // call the user service to update user theme information
        } else {
            // if user not loggled in store in localstorage
            localStorage.setItem(LOCAL_STORAGE_KEY, theme);
            console.log("Theme stored in localstorage");
        }
    }, [theme]);

    return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export { ThemeContext, ThemeProvider };
