// this is the service to deal with the user image upload
import { user_api } from "./api";

const uploadImage = async (token, image) => {
    try {
        const formData = new FormData();
        formData.append("image", image);

        const response = await user_api.post("/user/image", formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
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
