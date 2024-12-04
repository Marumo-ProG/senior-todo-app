import { useState, useEffect } from "react";

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

const TodoList = ({ list, handleOnChange, theme, handleClearCompleted }) => {
    const [viewedList, setViewedList] = useState(list);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        if (filter === "all") return setViewedList(list);
        if (filter === "active") return setViewedList(list.filter((item) => !item.completed));
        if (filter === "completed") return setViewedList(list.filter((item) => item.completed));
    }, [list]);

    const handleDisplayAll = () => {
        if (filter === "all") return;
        setFilter("all");
        setViewedList(list);
    };
    const handleDisplayActive = () => {
        if (filter === "active") return;
        setFilter("active");
        setViewedList(list.filter((item) => !item.completed));
    };
    const handleDisplayCompleted = () => {
        if (filter === "completed") return;
        setFilter("completed");
        setViewedList(list.filter((item) => item.completed));
    };

    return (
        <Paper
            width={"100%"}
            maxWidth={"540px"}
            elevation={4}
            sx={{ padding: 0, overflow: "hidden" }}
        >
            <Stack
                minHeight={"300px"}
                spacing={2}
                justifyContent={"space-between"}
                sx={{ backgroundColor: theme === "light" ? "white" : "#25273D" }}
            >
                <Stack>
                    {viewedList.length > 0 ? (
                        viewedList.map((item, index) => (
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
                                                    color:
                                                        theme === "light" ? "#E3E4F1" : "#393A4B",
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
                        ))
                    ) : (
                        <Stack padding={2}>
                            <Typography
                                variant={"body"}
                                sx={{ fontSize: 14, color: "#9495A5", textAlign: "center" }}
                            >
                                No items
                            </Typography>
                        </Stack>
                    )}
                </Stack>
                <Stack
                    direction="row"
                    padding={2}
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
                        <Box sx={{ cursor: "pointer" }} onClick={handleDisplayAll}>
                            <Typography
                                variant={"body"}
                                sx={{
                                    fontSize: 14,
                                    color: filter === "all" ? "blue" : "#9495A5",
                                    fontFamily: "Josefin sans",
                                    fontWeight: "bold",
                                }}
                            >
                                All
                            </Typography>
                        </Box>
                        <Box sx={{ cursor: "pointer" }} onClick={handleDisplayActive}>
                            <Typography
                                variant={"body"}
                                sx={{
                                    fontSize: 14,
                                    color: filter === "active" ? "blue" : "#9495A5",
                                    fontFamily: "Josefin sans",
                                    fontWeight: "bold",
                                }}
                            >
                                Active
                            </Typography>
                        </Box>
                        <Box sx={{ cursor: "pointer" }} onClick={handleDisplayCompleted}>
                            <Typography
                                variant={"body"}
                                sx={{
                                    fontSize: 14,
                                    color: filter === "completed" ? "blue" : "#9495A5",
                                    fontFamily: "Josefin sans",
                                    fontWeight: "bold",
                                }}
                            >
                                Completed
                            </Typography>
                        </Box>
                    </Stack>
                    <Box sx={{ cursor: "pointer" }} onClick={handleClearCompleted}>
                        <Typography
                            variant={"body"}
                            sx={{ fontSize: 14, color: "#9495A5", fontFamily: "Josefin Sans" }}
                        >
                            Clear Completed
                        </Typography>
                    </Box>
                </Stack>
            </Stack>
        </Paper>
    );
};

export default TodoList;
