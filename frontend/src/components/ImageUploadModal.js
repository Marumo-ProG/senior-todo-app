import { useState, useEffect } from "react";

// react upload image

// MUI
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Cardmedia from "@mui/material/CardMedia";

// Services
import AWS from "aws-sdk";
import imageUploadService from "../common/services/imageUpload.service";

// Context
import { useAuth } from "../common/context/AuthContext";

// MUI
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// Icons
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

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

const ImageUploadModal = ({ open, handleClose }) => {
    const { user, token } = useAuth();
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [progress, setProgress] = useState(0);

    const { updateProfilePicture } = imageUploadService;

    const handleImageChange = (file) => {
        setPreviewImage(file);
        const reader = new FileReader();
        reader.onload = () => {
            setImage({ name: file.name, content: reader.result });
        };
        reader.readAsArrayBuffer(file);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (image) {
            uploadToS3(image);
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

                    const { status } = await updateProfilePicture(token, imageUrl);
                    if (status === 200) {
                        handleClose();
                    } else {
                        alert("Error updating user image details in the database");
                    }
                }
            });
    };
    const handleRemoveImage = async () => {
        const { status } = await updateProfilePicture(token, "");
        if (status === 200) {
            handleClose();
        } else {
            alert("Error updating user image details in the database");
        }
    };
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            sx={{
                ".MuiPaper-root": {
                    width: "100%",
                },
            }}
        >
            <Stack spacing={3} p={2} width={"100%"} alignItems={"center"}>
                <Typography variant="h5">Upload Image</Typography>
                <form onSubmit={handleFormSubmit}>
                    <Stack spacing={2} alignItems={"center"}>
                        <CloudUploadIcon sx={{ fontSize: 100, color: "#999" }} />
                        <input
                            accept="image/*"
                            id="contained-button-file"
                            multiple
                            type="file"
                            onChange={(e) => handleImageChange(e.target.files[0])}
                        />
                        {(previewImage || user?.profilePicture) && (
                            <Box
                                sx={{
                                    width: 200,
                                    height: 200,
                                    borderRadius: 10,
                                    overflow: "hidden",
                                }}
                            >
                                <Cardmedia
                                    component="img"
                                    height="100%"
                                    image={
                                        previewImage
                                            ? URL.createObjectURL(previewImage)
                                            : user?.profilePicture
                                    }
                                    sx={{
                                        width: "100%",
                                        height: "auto",
                                        objectFit: "cover",
                                    }}
                                />
                            </Box>
                        )}

                        {previewImage && (
                            <Button variant="contained" color="primary" type="submit">
                                Upload Image
                            </Button>
                        )}
                        {user?.profilePicture && (
                            <Button variant="contained" color="primary" onClick={handleRemoveImage}>
                                Remove Backgoround Image
                            </Button>
                        )}
                        {progress > 0 && (
                            <Typography variant="body1" sx={{ textAlign: "center" }}>
                                Progress: {progress}%
                            </Typography>
                        )}
                    </Stack>
                </form>
            </Stack>
        </Dialog>
    );
};

export default ImageUploadModal;
