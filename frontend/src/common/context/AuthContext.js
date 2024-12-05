// This is the authentication module that will be used to authenticate the user.

import { createContext, useState, useContext, useEffect } from "react";

// services
import UserService from "../services/user.service";

// Create a context with a default value of "light"
const AuthContext = createContext(null);

const LOCAL_STORAGE_KEY = "senior-todo-user-token";

// Create a AuthProvider component that wraps its children in the AuthContext.Provider
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    // using the useEffect hook to check if the user is already logged in
    useEffect(() => {
        const token = localStorage.getItem(LOCAL_STORAGE_KEY);

        if (token) {
            // retrieve user todo's from todo service
        }
    }, []);

    // user functions
    const signup = async (user) => {
        setLoading(true);
        const response = await UserService.signup(user);

        if (response.status === "success") {
            setUser(response.user);
            alert("Signup successful");

            // store the token in the local storage

            // retrieve user todo's from todo service
        } else {
            alert("Signup failed, user already exists, try again");
        }

        setLoading(false);
    };
    const login = async (user) => {
        setLoading(true);
        const response = await UserService.login(user.email, user.password);

        if (response.status === 200) {
            setUser(response.user);
            alert("Login successful");

            // store the token in the local storage
            localStorage.setItem(LOCAL_STORAGE_KEY, response.token);

            // retrieve user todo's from todo service
        }

        setLoading(false);

        return response.status;
    };
    const logout = () => {
        setUser(null);

        // remove the token from the local storage

        // remove the user todo's from the local storage
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                signup,
                login,
                logout,
                loading,
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
