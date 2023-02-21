// import { useState, useEffect } from "react";
// import { Switch, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Body from './components/Body'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Footer from "./components/Footer";
import { UserProvider } from '../src/context/user';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#538f39',
      dark: '#231f20',
      light: '#eef6eb',
      contrastText: '#fdfdfd',
    },
    secondary: {
      main: '#ebebeb',
      contrastText: '#231f20',
    },
    text: {
      primary: '#231f20',
      secondary: '#231f20',
      disabled: '#949494',
      hint: '#231f20',
    },
    background: {
      default: '#fdfdfd',
      paper: '#f3f3f3',
    },
  },
  typography: {
    h1: {
      fontWeight: 900,
      fontSize: '3.5rem'
    },
    h2: {
      fontFamily: 'Poppins',
      fontWeight: 900,
      fontSize: '2rem'
    },
    h3: {
      fontFamily: 'Poppins',
      fontWeight: 900,
    },
    h4: {
      fontFamily: 'Poppins',
      fontWeight: 900,
    },
    h5: {
      fontFamily: 'Poppins',
      fontWeight: 900,
    },
    h6: {
      fontFamily: 'Poppins',
      fontWeight: 900,
    },
    subtitle1: {
      fontFamily: 'Poppins',
    },
    subtitle2: {
      fontFamily: 'Poppins',
    },
    body1: {
      fontFamily: 'Poppins',
    },
    body2: {
      fontFamily: 'Poppins',
    },
    button: {
      fontFamily: 'Poppins',
      letterSpacing: '.05rem'
    },
    caption: {
      fontFamily: 'Poppins',
    },
    overline: {
      fontFamily: 'Poppins',
    },
    fontFamily: 'Poppins',
    fontWeightBold: 900,
    fontSize: 16,
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 30,
      },
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: 30,
      },
    },
    MuiCard: {
      root: {
        borderRadius: 30,
        boxShadow: 'unset',
      },
    },
    MuiAppBar: {
      root: {
        backgroundColor: '#fdfdfd!important',
        color: '#231f20!important',
        boxShadow: 'unset',
      },
    },
    MuiInputBase: {
      root: {
        backgroundColor: '#EBEBEB',
        borderRadius: 30,
      },
    },
    MuiPaper: {
      root: {
        backgroundColor: '#fdfdfd',
      }
    }
  },
});

function App() {
  // const [count, setCount] = useState(0);

  // useEffect(() => {
  //   fetch("/hello")
  //     .then((r) => r.json())
  //     .then((data) => setCount(data.count));
  // }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <UserProvider>
          <div className="App" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Nav/>
            <Body/>
            <Footer/>
          </div>
        </UserProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
