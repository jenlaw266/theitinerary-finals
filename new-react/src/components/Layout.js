import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      light: '#fffceb',
      main: '#f7e34d',
      dark: '#ffee00',
      contrastText: '#000000'
    },
    secondary: {
      light: '#dadef0',
      main: '#657abb',
      contrastText: '#FFFFFF'
    }
  },
  typography: {
    fontFamily: [
      'Quicksand',
      'sans-serif'
    ].join(','),
  }
});

// const theme = createTheme({});

const useStyles = makeStyles({
  toolbar: theme.mixins.toolbar,
});

const Layout = (props) => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.toolbar}></div>
      {props.children}
    </ThemeProvider>
  );
};

export default Layout;
