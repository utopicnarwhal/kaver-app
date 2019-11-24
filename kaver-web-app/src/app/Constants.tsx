import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";
import { orange } from "@material-ui/core/colors";
import { PaletteOptions, PaletteColorOptions } from "@material-ui/core/styles/createPalette";
import { TypographyOptions } from "@material-ui/core/styles/createTypography";

export const kaverTheme = createMuiTheme({
    status: {
        danger: orange[500],
    },
    palette: {
        primary: {
            main: orange[500],
        } as PaletteColorOptions,
    } as PaletteOptions,
    typography: {
        fontFamily: `
        'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif
        `
    } as TypographyOptions,
} as ThemeOptions);
