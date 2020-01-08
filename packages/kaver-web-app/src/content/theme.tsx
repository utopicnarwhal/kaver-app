import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";
import { orange } from "@material-ui/core/colors";
import { Color } from "@material-ui/core";

const greenThemePalette = {
    50: "#e8f5e9",
    100: "#c8e6c9",
    200: "#a5d6a7",
    300: "#81c784",
    400: "#66bb6a",
    500: "#4caf50",
    600: "#43a047",
    700: "#388e3c",
    800: "#2e7d32",
    900: "#1b5e20",
    A100: "#b9f6ca",
    A200: "#69f0ae",
    A400: "#00e676",
    A700: "#00c853"
} as Color;

export const kaverThemeLight = createMuiTheme({
    status: {
        danger: orange[500],
    },
    palette: {
        primary: {
            main: greenThemePalette[600],
        },
        background: {
            default: "#F8F8F8",
        }
    },
    typography: {
        fontFamily: `
        'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif
        `,
    },
} as ThemeOptions);
