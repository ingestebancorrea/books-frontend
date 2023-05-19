import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const blueTheme = createTheme({
    palette: {
        primary: {
            main: '#1C4865'
        },
        secondary: {
            main: '#ff8000'
        },
        error: {
            main: red.A200
        }
    }
})