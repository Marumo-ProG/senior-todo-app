// MUI
import Dialog from "@mui/material/Dialog";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// React Hook forms
import { useForm, Controller } from "react-hook-form";

const LoginModal = ({ open, handleClose }) => {
    const { control, handleSubmit } = useForm();

    const handleLogin = (data) => {
        console.log(data);
    };
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            title="Login"
            fullWidth="md"
            sx={{
                "& .MuiPaper-root": {
                    padding: 3,
                },
            }}
        >
            <form onSubmit={handleSubmit(handleLogin)}>
                <Stack spacing={3}>
                    <Typography variant="h4" sx={{ textAlign: "center" }}>
                        Login
                    </Typography>

                    <Stack spacing={2}>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            rules={{ required: "Email is required" }}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    label="Email"
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
                                    label="Password"
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
                        <Button variant="contained" type="submit">
                            Login
                        </Button>
                    </Stack>
                </Stack>
            </form>
        </Dialog>
    );
};

export default LoginModal;
