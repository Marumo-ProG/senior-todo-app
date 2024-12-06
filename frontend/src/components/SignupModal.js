import { useContext, useState } from "react";

// Services
import { useAuth } from "../common/context/AuthContext";

// MUI
import Dialog from "@mui/material/Dialog";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// Context
import { ThemeContext } from "../common/context/ThemeProvider";

// React Hook forms
import { useForm, Controller } from "react-hook-form";

// Loader
import CircularProgress from "@mui/material/CircularProgress";

const SignupModal = ({ open, handleClose }) => {
    const { theme } = useContext(ThemeContext);
    const { control, handleSubmit } = useForm();

    const { signup, loading } = useAuth();
    const [error, setError] = useState(null);

    const handleSignup = async (data) => {
        data.theme = theme;
        data.profilePicture = "";

        // sending the data and getting a response
        const status = await signup(data);
        if (status === 201) {
            handleClose();
        } else {
            setError("Error creating user, either user already exists or invalid data");
        }
    };
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            title="Signup"
            fullWidth="md"
            sx={{
                "& .MuiPaper-root": {
                    padding: 3,
                },
            }}
        >
            <form onSubmit={handleSubmit(handleSignup)}>
                <Stack spacing={3}>
                    <Typography variant="h4" sx={{ textAlign: "center" }}>
                        Signup
                    </Typography>

                    {error && (
                        <Typography variant="body" sx={{ color: "red" }}>
                            {error}
                        </Typography>
                    )}

                    <Stack spacing={2}>
                        <Controller
                            name="username"
                            control={control}
                            defaultValue=""
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    label="Username"
                                    fullWidth
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                />
                            )}
                        />
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            rules={{ required: "Email is required" }}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    label="Email *"
                                    type="email"
                                    fullWidth
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                />
                            )}
                        />
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            rules={{ required: "Password is required" }}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    label="Password *"
                                    type="password"
                                    helperText={error ? error.message : null}
                                    error={!!error}
                                    fullWidth
                                />
                            )}
                        />
                    </Stack>
                    <Stack direction="row" alignItems={"center"} spacing={2}>
                        <Button variant="contained" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            type="submit"
                            endIcon={loading && <CircularProgress size={20} />}
                        >
                            Signup
                        </Button>
                    </Stack>
                </Stack>
            </form>
        </Dialog>
    );
};

export default SignupModal;
