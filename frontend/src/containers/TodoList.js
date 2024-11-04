// MUI
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";

// Components
import Typography from "../components/Typography";

// Icons
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const TodoList = ({ list, handleOnChange }) => {
    return (
        <Stack spacing={2} width={"100%"} maxWidth={"540px"}>
            {list.map((item, index) => (
                <Stack
                    padding={2}
                    direction={"row"}
                    alignItems={"center"}
                    key={index}
                    sx={{ borderBottom: "1px #999 solid" }}
                >
                    <Box display={"flex"} alignItems={"center"}>
                        <Checkbox
                            icon={<RadioButtonUncheckedIcon />}
                            checkedIcon={<CheckCircleOutlineIcon />}
                            onChange={() => handleOnChange(index)}
                        />
                    </Box>

                    <Typography
                        variant={"h5"}
                        sx={{
                            textDecoration: item.completed ? "line-through" : "none",
                            color: item.completed ? "gray" : "black",
                            fontFamily: "Josefin Sans",
                        }}
                    >
                        {item.title}
                    </Typography>
                </Stack>
            ))}
        </Stack>
    );
};

export default TodoList;
