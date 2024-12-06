import axios from "axios";

const user_api = axios.create({
    baseURL: process.env.REACT_APP_USER_API_URL,
});

const todo_api = axios.create({
    baseURL: process.env.REACT_APP_TODO_API_URL,
});

export { user_api, todo_api };
