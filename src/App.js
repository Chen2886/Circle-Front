import "./App.css";
import Login from "./Login.js";
import Main from "./Main.js";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  Grid,
  InputBase,
  AppBar,
  Button,
  Toolbar,
  IconButton,
  Typography,
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import Helmet from "react-helmet";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  link: {
    textDecoration: 'none',
  },
  title: {
    flexGrow: 1,
    color: 'white',
    textDecoration: 'none',
    "&:hover": {
      color: "lightgray",
      cursor: "pointer",
    },
  },
  appBar: {
    backgroundColor: "#528487",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "30ch",
    },
    alignContent: "center",
  },
}));

const font = "'Tenor Sans', sans-serif";

const theme = createMuiTheme({
  typography: {
    fontFamily: font,
  },
});

export default function App(props) {
  const classes = useStyles();
  const [showSearchField, setShowSearchField] = React.useState(true);

  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <div className={classes.grow}>
          <Helmet>
            <title>Home</title>
            <style>{"body { background-color: grey; }"}</style>
          </Helmet>
          <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
              <Toolbar>
                <Grid
                  justify="space-between"
                  container
                  alignItems="center"
                  direction="row"
                >
                  <Grid xs={2} item align="left">
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <IconButton
                              edge="start"
                              className={classes.menuButton}
                              color="inherit"
                              aria-label="menu"
                            >
                              <MenuIcon />
                            </IconButton>
                          </td>
                          <td>
                            <Link to="/" className={classes.link}>
                              <Typography
                                variant="h5"
                                className={classes.title}
                              >
                                CIRCLE
                              </Typography>
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Grid>
                  <Grid xs={2} item></Grid>
                  <Grid xs={4} item>
                    {showSearchField && (
                      <div className={classes.search}>
                        <div className={classes.searchIcon}>
                          <SearchIcon />
                        </div>
                        <InputBase
                          placeholder="Search…"
                          classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                          }}
                          inputProps={{ "aria-label": "search" }}
                        />
                      </div>
                    )}
                  </Grid>
                  <Grid xs={3} item></Grid>
                  <Grid xs={1} item>
                    <div align="right">
                      <Button color="inherit" component={Link} to="/login">
                        Login
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </Toolbar>
            </AppBar>
          </div>
        </div>
        <Switch>
          <Route
            exact
            path="/login"
            component={() => <Login setShowSearchField={setShowSearchField} />}
          />
          <Route
            exact
            path="/"
            component={() => <Main setShowSearchField={setShowSearchField} />}
          />
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}
