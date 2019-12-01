import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";
import { orange } from "@material-ui/core/colors";
import { PaletteOptions, PaletteColorOptions } from "@material-ui/core/styles/createPalette";
import { TypographyOptions } from "@material-ui/core/styles/createTypography";
import { Color } from "@material-ui/core";

const greenThemePalette = {
    50: "#e7f5e5",
    100: "#c5e6c0",
    200: "#9fd698",
    300: "#76c66d",
    400: "#56ba4c",
    500: "#43a047",
    600: "#279f1e",
    700: "#388e3c",
    800: "#007c00",
    900: "#005e00",
    A100: "#dbebc2",
    A200: "#c3de9b",
    A400: "#97c751",
    A700: "#619a1d"
} as Color;

export const kaverThemeLight = createMuiTheme({
    status: {
        danger: orange[500],
    },
    palette: {
        primary: {
            main: greenThemePalette[500],
        },
        background: {
            default: "FEFEFE",
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
