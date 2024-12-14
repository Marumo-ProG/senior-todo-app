// this is the service to deal with the user image upload
import { user_api } from "./api";

const updateProfilePicture = async (token, image_url) => {
    try {
        user_api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await user_api.put("/user/", {
            profilePicture: image_url,
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

export default { updateProfilePicture };
