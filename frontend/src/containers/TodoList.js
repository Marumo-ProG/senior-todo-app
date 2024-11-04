// MUI
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";

// Components
import Typography from "../components/Typography";

// Icons
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const TodoList = ({ list, handleOnChange, theme }) => {
    const handleDisplayAll = () => {};
    const handleDisplayActive = () => {};
    const handleDisplayCompleted = () => {};
    const handleClearCompleted = () => {};
    return (
        <Paper
            width={"100%"}
            maxWidth={"540px"}
            elevation={4}
            sx={{ padding: 0, overflow: "hidden" }}
        >
            <Stack spacing={2} sx={{ backgroundColor: theme === "light" ? "white" : "#25273D" }}>
                {list.map((item, index) => (
                    <Stack
                        padding={2}
                        direction={"row"}
                        alignItems={"center"}
                        key={index}
                        sx={{ borderBottom: "1px #979797 solid" }}
                    >
                        <Box display={"flex"} alignItems={"center"}>
                            <Checkbox
                                icon={
                                    <RadioButtonUncheckedIcon
                                        sx={{
                                            color: theme === "light" ? "#E3E4F1" : "#393A4B",
                                        }}
                                    />
                                }
                                checkedIcon={<CheckCircleOutlineIcon />}
                                checked={item.completed}
                                onChange={() => handleOnChange(index)}
                            />
                        </Box>

                        <Typography
                            variant={"body"}
                            sx={{
                                textDecoration: item.completed ? "line-through" : "none",
                                fontFamily: "Josefin Sans",
                                fontSize: 18,
                                color:
                                    item.completed && theme === "dark"
                                        ? "#4D5067"
                                        : theme === "light"
                                        ? "#9495A5"
                                        : "#767992",
                            }}
                        >
                            {item.title}
                        </Typography>
                    </Stack>
                ))}
                <Stack
                    direction="row"
                    padding={1}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                >
                    <Typography
                        variant={"body"}
                        sx={{
                            fontSize: 14,
                            color: "#9495A5",
                            fontFamily: "Josefin sans",
                        }}
                    >
                        {list.filter((item) => !item.completed).length} items left
                    </Typography>
                    <Stack direction="row" spacing={3} alignItems={"center"}>
                        <Typography
                            variant={"body"}
                            sx={{
                                fontSize: 14,
                                color: "#9495A5",
                                fontFamily: "Josefin sans",
                                fontWeight: "bold",
                            }}
                        >
                            All
                        </Typography>
                        <Typography
                            variant={"body"}
                            sx={{
                                fontSize: 14,
                                color: "#9495A5",
                                fontFamily: "Josefin sans",
                                fontWeight: "bold",
                            }}
                        >
                            Active
                        </Typography>
                        <Typography
                            variant={"body"}
                            sx={{
                                fontSize: 14,
                                color: "#9495A5",
                                fontFamily: "Josefin sans",
                                fontWeight: "bold",
                            }}
                        >
                            Completed
                        </Typography>
                    </Stack>
                    <Typography
                        variant={"body"}
                        sx={{ fontSize: 14, color: "#9495A5", fontFamily: "Josefin Sans" }}
                    >
                        Clear Completed
                    </Typography>
                </Stack>
            </Stack>
        </Paper>
    );
};

export default TodoList;
