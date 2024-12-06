import { todo_api } from "./api";

// getting all the todos for the user
const getAllTodos = async (token) => {
    try {
        const response = await todo_api.get("/todos", {
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

// creating a new todo
const createTodo = async (token, todo) => {
    try {
        const response = await todo_api.post("/todos/create", todo, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return {
            status: 201,
            data: response.data,
        };
    } catch (error) {
        return {
            status: error.response?.status,
        };
    }
};

// completing a todo
const completeTodo = async (token, id) => {
    try {
        const response = await todo_api.post(
            "/todos/complete",
            { id: id },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
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

// incompleting a todo
const incompleteTodo = async (token, id) => {
    try {
        const response = await todo_api.post(
            "/todos/incomplete",
            { id },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
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

// deleting completed todo's
const clearCompletedTodos = async (token) => {
    try {
        const response = await todo_api.post(
            "/todos/clear",
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
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

export default {
    getAllTodos,
    createTodo,
    completeTodo,
    incompleteTodo,
    clearCompletedTodos,
};
