// This is the authentication module that will be used to authenticate the user.

import { createContext, useState, useContext, useEffect } from "react";

// Cloud Libraries
import AWS from "aws-sdk";

// services
import UserService from "../services/user.service";
import imageUploadService from "../services/imageUpload.service";

// Create a context with a default value of "light"
const AuthContext = createContext(null);

const LOCAL_STORAGE_KEY_TOKEN = "senior-todo-user-token";

// AWS S3 bucket Configuration
const S3_BUCKET = process.env.REACT_APP_AWS_BUCKET;
const REGION = process.env.REACT_APP_AWS_REGION;

AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
});

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
});

// Create a AuthProvider component that wraps its children in the AuthContext.Provider
const AuthProvider = ({ children }) => {
    const { updateProfilePicture } = imageUploadService;
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    // using the useEffect hook to check if the user is already logged in
    useEffect(() => {
        const token = localStorage.getItem(LOCAL_STORAGE_KEY_TOKEN);

        if (token) {
            // get the username and password from the token
            fetchUserDetails(token);
        }
    }, []);

    const fetchUserDetails = async (token) => {
        const { status, data } = await UserService.getUserDetails(token);

        if (status === 200) {
            setUser(data.user);
        }
    };

    // user functions
    const signup = async (user) => {
        setLoading(true);
        const response = await UserService.signup(user);

        if (response.status === 201) {
            setUser(response.user);
            alert("Signup successful");

            // store the token in the local storage
            localStorage.setItem(LOCAL_STORAGE_KEY_TOKEN, response.token);

            // retrieve user todo's from todo service
        } else {
            alert("Signup failed, user already exists, try again");
        }

        setLoading(false);

        return response.status;
    };
    const login = async (user) => {
        setLoading(true);
        const response = await UserService.login(user.email, user.password);

        if (response.status === 200) {
            setUser(response.user);
            alert("Login successful");

            // store the token in the local storage
            localStorage.setItem(LOCAL_STORAGE_KEY_TOKEN, response.token);

            // retrieve user todo's from todo service
        }

        setLoading(false);

        return response.status;
    };
    const logout = () => {
        setUser(null);

        // remove the token from the local storage
        localStorage.removeItem(LOCAL_STORAGE_KEY_TOKEN);

        // remove the user todo's from the local storage
    };

    const handleRemoveImage = async () => {
        const { status } = await updateProfilePicture(
            localStorage.getItem(LOCAL_STORAGE_KEY_TOKEN),
            ""
        );
        if (status === 200) {
            await deleteFileFromS3(user?.profilePicture)
                .then((response) => {
                    alert("Image removed successfully");
                    fetchUserDetails(localStorage.getItem(LOCAL_STORAGE_KEY_TOKEN));
                })
                .catch((error) => alert("Error removing image"));
        } else {
            alert("Error updating user image details in the database");
        }
    };

    const uploadToS3 = async (file) => {
        const params = {
            // ACL: "public-read",
            Body: file.content,
            Bucket: S3_BUCKET,
            Key: file.name,
        };
        myBucket
            .putObject(params)
            .on("httpUploadProgress", (evt) => {
                setProgress(Math.round((evt.loaded / evt.total) * 100));
            })
            .send(async (err) => {
                if (err) console.log("Error uploading:", err);
                else {
                    // updating the theme image in the user database
                    const imageUrl = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${file.name}`;

                    const { status } = await updateProfilePicture(
                        localStorage.getItem(LOCAL_STORAGE_KEY_TOKEN),
                        imageUrl
                    );
                    if (status === 200) {
                        fetchUserDetails(localStorage.getItem(LOCAL_STORAGE_KEY_TOKEN));
                    } else {
                        alert("Error updating user image details in the database");
                    }
                }
            });
    };

    const deleteFileFromS3 = async (fileUrl) => {
        try {
            // Parse the file key from the URL
            const bucketName = "senior-todo-app-bucket";
            const url = new URL(fileUrl);
            const fileKey = decodeURIComponent(url.pathname.substring(1)); // Remove leading '/'

            // Delete parameters
            const params = {
                Bucket: bucketName,
                Key: fileKey,
            };

            // Delete the file
            await myBucket.deleteObject(params).promise();
        } catch (error) {
            console.error("Error deleting file:", error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                signup,
                login,
                logout,
                loading,
                token: localStorage.getItem(LOCAL_STORAGE_KEY_TOKEN),
                deleteFileFromS3,
                uploadToS3,
                progress,
                handleRemoveImage,
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
