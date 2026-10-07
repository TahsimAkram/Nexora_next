import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#171817",
      contrastText: "#f3f2ed",
    },
    secondary: {
      main: "#d5f36a",
      contrastText: "#171817",
    },
    background: {
      default: "#f3f2ed",
      paper: "#ffffff",
    },
    text: {
      primary: "#171817",
      secondary: "#777a75",
    },
    divider: "rgba(23, 24, 23, 0.14)",
  },

  typography: {
    fontFamily: '"Manrope", sans-serif',
    h1: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 600,
      letterSpacing: "-0.065em",
    },
    h2: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 600,
      letterSpacing: "-0.055em",
    },
    h3: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 600,
      letterSpacing: "-0.04em",
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 8,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "var(--color-paper)",
          color: "var(--color-ink)",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
  },
});

export default theme;
