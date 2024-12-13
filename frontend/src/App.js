import { useContext, useState, useEffect } from "react";

// Context
import { ThemeContext } from "./common/context/ThemeProvider";

// Auth
import { useAuth } from "./common/context/AuthContext";

// Services
import todoService from "./common/services/todo.service";

// MUI
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "./components/Typography";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";

// Containers
import TodoList from "./containers/TodoList";
import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SignupModal";
import ImageUploadModal from "./components/ImageUploadModal";

// Images
import DefaultbackgroundImage from "./assets/images/default_background.jpg";
import DarkBackground from "./assets/images/darkmode_background.jpg";

// Icons
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import UploadFileIcon from "@mui/icons-material/UploadFile";

function App() {
    const { user, logout, token } = useAuth();
    const { theme, setTheme } = useContext(ThemeContext);
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [openSignupModal, setOpenSignupModal] = useState(false);
    const [loadingTodos, setLoadingTodos] = useState(false);

    const [list, setList] = useState([]);
    const [inputTask, setInputTask] = useState({ title: "", completed: false });
    const [openImageUploadModal, setOpenImageUploadModal] = useState(false);

    useEffect(() => {
        if (user) {
            fetchTodos();
        }
    }, [user]);

    const fetchTodos = async () => {
        setLoadingTodos(true);
        const response = await todoService.getAllTodos(token);
        if (response.status === 200) {
            setList(response.data.todos);
        }
        setLoadingTodos(false);
    };

    const handleSetTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    const handleOnChange = async (index) => {
        if (user) {
            if (list[index].complete) {
                const { status } = await todoService.incompleteTodo(token, list[index]._id);
                if (status === 200) {
                    fetchTodos();
                }
            } else {
                const { status } = await todoService.completeTodo(token, list[index]._id);
                if (status === 200) {
                    fetchTodos();
                }
            }
        } else {
            setList((prevList) => {
                const newList = [...prevList];
                newList[index].complete = !newList[index].complete;
                return newList;
            });
        }
    };
    const handleAddTask = async (event) => {
        if (event.key !== "Enter") return;
        if (user) {
            const { status, data } = await todoService.createTodo(token, {
                title: inputTask.title,
                complete: inputTask.complete,
            });
            if (status === 201) {
                fetchTodos();
                setInputTask({ title: "", complete: false });
            }
        } else {
            setList((prevList) => [...prevList, inputTask]);
            setInputTask({ title: "", complete: false });
        }
    };
    const handleClearCompleted = async () => {
        if (user) {
            const { status } = await todoService.clearCompletedTodos(token);
            if (status === 200) {
                alert("All completed tasks have been cleared");
                fetchTodos();
            }
        } else {
            setList((prevList) => prevList.filter((item) => !item.complete));
        }
    };

    return (
        <>
            <Stack
                height={"100vh"}
                alignItems={"center"}
                sx={{ backgroundColor: theme === "light" ? "white" : "#25273D" }}
            >
                <Box
                    sx={{
                        display: "grid",
                        height: "100%",
                        width: "100%",
                        justifyContent: "center",
                        gridTemplateColumns: "auto",
                        gridTemplateRows: {
                            xs: "auto auto auto",
                            md: "70px minmax(200px,435px) auto",
                        },
                    }}
                >
                    <Stack
                        sx={{
                            gridRow: "1/2",
                            gridColumn: "1/2",
                            justifySelf: "end",
                            alignSelf: "center",
                            height: "fit-content",
                            p: 4,
                            width: "100%",
                        }}
                        direction={{ xs: "column-reverse", sm: "row" }}
                        spacing={3}
                        justifyContent={"space-between"}
                        boxSizing={"border-box"}
                    >
                        <Button
                            startIcon={<UploadFileIcon />}
                            variant="contained"
                            onClick={() => setOpenImageUploadModal(true)}
                            sx={{
                                background: "white",
                                color: "blue",
                            }}
                        >
                            Change Background image
                        </Button>
                        {user === null ? (
                            <Stack direction="row" spacing={3} alignItems={"center"}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    sx={{ textTransform: "none" }}
                                    onClick={() => setOpenLoginModal(true)}
                                >
                                    Login
                                </Button>
                                <Button
                                    variant="contained"
                                    sx={{
                                        textTransform: "none",
                                        backgroundColor: "white",
                                        color: "black",
                                    }}
                                    onClick={() => setOpenSignupModal(true)}
                                >
                                    Signup
                                </Button>
                            </Stack>
                        ) : (
                            <Stack direction="row" spacing={3} alignItems="center" zIndex={1}>
                                <Typography variant="h5" sx={{ color: "white" }}>
                                    Welcome, {user.username}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    sx={{ textTransform: "none" }}
                                    onClick={logout}
                                >
                                    Logout
                                </Button>
                            </Stack>
                        )}
                    </Stack>

                    <CardMedia
                        component="img"
                        image={theme === "light" ? DefaultbackgroundImage : DarkBackground}
                        alt="Default background"
                        sx={{
                            width: "100%",
                            height: "100%",
                            gridRow: "1/3",
                            gridColumn: "1/2",
                            objectFit: "cover",
                        }}
                    />
                    <Stack
                        spacing={5}
                        width={"100%"}
                        maxWidth={"540px"}
                        sx={{
                            gridRow: "2/4",
                            gridColumn: "1/2",
                            zIndex: 1,
                            justifySelf: "center",
                        }}
                    >
                        <Stack direction="row" justifyContent="space-between" alignItems={"center"}>
                            <Typography variant={"h3"} sx={{ color: "white" }}>
                                TO DO
                            </Typography>
                            <IconButton onClick={handleSetTheme}>
                                {theme === "light" ? (
                                    <DarkModeIcon sx={{ fontSize: 30, color: "white" }} />
                                ) : (
                                    <LightModeIcon sx={{ fontSize: 30, color: "white" }} />
                                )}
                            </IconButton>
                        </Stack>
                        <Stack spacing={3}>
                            <Paper elevation={4} sx={{ overflow: "hidden" }}>
                                <Stack
                                    backgroundColor={theme === "light" ? "white" : "#25273D"}
                                    padding={1}
                                    alignItems={"center"}
                                    direction={"row"}
                                >
                                    <Box display={"flex"} alignItems={"center"}>
                                        <Checkbox
                                            icon={
                                                <RadioButtonUncheckedIcon
                                                    sx={{
                                                        color:
                                                            theme === "light"
                                                                ? "#E3E4F1"
                                                                : "#393A4B",
                                                    }}
                                                />
                                            }
                                            checkedIcon={<CheckCircleOutlineIcon />}
                                            checked={inputTask.complete}
                                        />
                                    </Box>
                                    <TextField
                                        placeholder="Add a task..."
                                        onKeyDown={handleAddTask}
                                        value={inputTask.title}
                                        onChange={(e) =>
                                            setInputTask({
                                                title: e.target.value,
                                                complete: false,
                                            })
                                        }
                                        sx={{
                                            flexGrow: 1,
                                            "& input": {
                                                color: theme === "light" ? "#9495A5" : "#767992",
                                            },

                                            "& .MuiOutlinedInput-notchedOutline": {
                                                border: "none",
                                            },
                                        }}
                                    />
                                </Stack>
                            </Paper>

                            <TodoList
                                list={list}
                                handleOnChange={handleOnChange}
                                theme={theme}
                                handleClearCompleted={handleClearCompleted}
                                loadingTodos={loadingTodos}
                            />
                        </Stack>
                        <Typography
                            variant={"body"}
                            sx={{
                                color: "#9495A5",
                                textAlign: "center",
                                fontFamily: "Josefin Sans",
                            }}
                        >
                            Drag and drop to reorder list
                        </Typography>
                    </Stack>
                </Box>
            </Stack>
            <LoginModal open={openLoginModal} handleClose={() => setOpenLoginModal(false)} />
            <SignupModal open={openSignupModal} handleClose={() => setOpenSignupModal(false)} />
            <ImageUploadModal
                open={openImageUploadModal}
                handleClose={() => setOpenImageUploadModal(false)}
            />
        </>
    );
}

export default App;
