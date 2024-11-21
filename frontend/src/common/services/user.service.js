import { cognito } from "./aws";

const signup = (user) => {
    // the signup parameters
    const params = {
        ClientId: "20n3g6vjqabsb7jefkvg3qph4o", // set once
        Username: user.username,
        Password: user.password,
        UserAttributes: [
            {
                Name: "email",
                Value: user.email,
            },
        ],
    };
    cognito.signUp(params, (err, data) => {
        if (err) {
            return {
                status: false,
                message: err.message,
            };
        } else {
            return {
                status: true,
                message: "User created successfully",
            };
        }
    });
};

const login = (user) => {
    // the login parameters
    const params = {
        AuthFlow: "USER_PASSWORD_AUTH",
        ClientId: "20n3g6vjqabsb7jefkvg3qph4o", // set once
        AuthParameters: {
            USERNAME: user.username,
            PASSWORD: user.password,
        },
    };
    cognito.initiateAuth(params, (err, data) => {
        if (err) {
            return {
                status: false,
                message: err.message,
            };
        } else {
            return {
                status: true,
                message: "Authenication successful",
            };
        }
    });
};

export { login, signup };
