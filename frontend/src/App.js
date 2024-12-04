import { useContext, useState } from "react";

// Context
import { ThemeContext } from "./common/context/ThemeProvider";

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
    const { theme, setTheme } = useContext(ThemeContext);
    const [openLoginModal, setOpenLoginModal] = useState(false);

    const [list, setList] = useState([
        { title: "Task 1", completed: false },
        { title: "Task 2", completed: true },
        { title: "Task 3", completed: false },
    ]);
    const [inputTask, setInputTask] = useState({ title: "", completed: false });

    const handleSetTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    const handleOnChange = (index) => {
        setList((prevList) => {
            const newList = [...prevList];
            newList[index].completed = !newList[index].completed;
            return newList;
        });
    };
    const handleAddTask = (event) => {
        if (event.key !== "Enter") return;
        setList((prevList) => [...prevList, inputTask]);
        setInputTask({ title: "", completed: false });
    };
    const handleClearCompleted = () => {
        setList((prevList) => prevList.filter((item) => !item.completed));
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
                        gridTemplateRows: { xs: "auto auto auto", md: "70px auto auto" },
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
                            sx={{
                                background: "white",
                                color: "blue",
                            }}
                        >
                            Change Background image
                        </Button>
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
                            >
                                Signup
                            </Button>
                        </Stack>
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
                                            checked={inputTask.completed}
                                        />
                                    </Box>
                                    <TextField
                                        placeholder="Add a task..."
                                        onKeyDown={handleAddTask}
                                        value={inputTask.title}
                                        onChange={(e) =>
                                            setInputTask({
                                                title: e.target.value,
                                                completed: false,
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
        </>
    );
}

export default App;
