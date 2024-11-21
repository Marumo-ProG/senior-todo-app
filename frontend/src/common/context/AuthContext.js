// This is the authentication module that will be used to authenticate the user.

import { createContext, useState, useContext } from "react";

// Create a context with a default value of "light"
const AuthContext = createContext(null);

// Create a AuthProvider component that wraps its children in the AuthContext.Provider
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // user functions
    const signup = (user) => {
        setUser(user);
    };
    const login = (user) => {
        setUser(user);
    };
    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                signup,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Create a custom hook that uses the AuthContext
const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export { AuthContext, AuthProvider, useAuth };
