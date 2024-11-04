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

// Containers
import TodoList from "./containers/TodoList";

// Images
import DefaultbackgroundImage from "./assets/images/default_background.jpg";

// Icons
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

function App() {
    const { theme, setTheme } = useContext(ThemeContext);

    const [list, setList] = useState([
        { title: "Task 1", completed: false },
        { title: "Task 2", completed: true },
        { title: "Task 3", completed: false },
    ]);
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

    return (
        <Stack height={"100vh"} alignItems={"center"}>
            <Box
                sx={{
                    display: "grid",
                    height: "100%",
                    width: "100%",
                    justifyContent: "center",
                    gridTemplateColumns: "auto",
                    gridTemplateRows: "70px auto auto",
                }}
            >
                <CardMedia
                    component="img"
                    image={DefaultbackgroundImage}
                    alt="Default background"
                    sx={{ width: "100%", height: "auto", gridRow: "1/3", gridColumn: "1/2" }}
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
                        <Stack
                            height={64}
                            backgroundColor={"white"}
                            borderRadius={4}
                            padding={2}
                            alignItems={"center"}
                            direction={"row"}
                        >
                            <Box display={"flex"} alignItems={"center"}>
                                <Checkbox
                                    icon={<RadioButtonUncheckedIcon />}
                                    checkedIcon={<CheckCircleOutlineIcon />}
                                />
                            </Box>
                            <TextField
                                placeholder="Add a task..."
                                sx={{
                                    flexGrow: 1,
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        border: "none",
                                    },
                                }}
                            />
                        </Stack>

                        <TodoList list={list} handleOnChange={handleOnChange} />
                    </Stack>
                    <Typography
                        variant={"body"}
                        sx={{ color: "#9495A5", textAlign: "center", fontFamily: "Josefin Sans" }}
                    >
                        Drag and drop to reorder list
                    </Typography>
                </Stack>
            </Box>
        </Stack>
    );
}

export default App;
