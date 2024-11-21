import MUITypography from "@mui/material/Typography";
import "@fontsource-variable/josefin-sans";

const Typography = ({ children, sx, ...props }) => {
    return (
        <MUITypography sx={{ fontFamily: '"Josefin Sans", sans-serif', ...sx }} {...props}>
            {children}
        </MUITypography>
    );
};

export default Typography;
