import {createTheme} from "@mui/material/styles";

const MainTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: '#626263',
            dark: '#3b3b3b',
            light: '#7b7b7d',
        },
        secondary: {
            main: '#f50057',
        },
        background: {
            default: "#303030",
            paper: '#303030',
        },
        success: {
            main: '#66d9bd',
            dark: '#5ec7ad',
        },
        warning: {
            main: '#EAC15A',
        },
        error: {
            main: '#d1557a',
            dark: '#ba4d6d',
        },
    },
    typography: {
        button: {
            fontWeight: 600,
            fontSize: '0.9rem',
        },
    },
})

export default MainTheme