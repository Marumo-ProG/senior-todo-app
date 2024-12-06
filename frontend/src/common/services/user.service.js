// user service for login and user creation

import api from "./api";

const login = async (email, password) => {
    try {
        const response = await api.post("/user/login", {
            email,
            password,
        });
        return {
            status: 200,
            user: response.data.user,
            token: response.data.token,
        };
    } catch (error) {
        console.error(error);
        return {
            status: error.response?.status,
        };
    }
};

const signup = async (user) => {
    try {
        const response = await api.post("/user/create", user);
        return {
            status: 201,
            user: response.data.user,
            token: response.data.token,
        };
    } catch (error) {
        console.error(error);
        return {
            status: error.response?.status,
        };
    }
};

const getUserDetails = async (token) => {
    try {
        const response = await api.get("/user", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return {
            status: 200,
            data: response.data,
        };
    } catch (error) {
        return {
            status: error.response?.status,
        };
    }
};

const UserService = {
    login,
    signup,
    getUserDetails,
};

export default UserService;
