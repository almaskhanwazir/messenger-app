import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  CssBaseline,
  Avatar,
  Checkbox,
  Link,
  Paper,
  makeStyles,
  FormControlLabel

} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  disabled: {
    color: theme.palette.text.disabled,
  },
  ButtonShade: {
    fontSIze: '20px',
    padding: '5px 40px',
    borderRadius: '5px',
    margin: '15px 0px',
    cursor: 'pointer',
    backgroundColor: '#FFFFFF', 
    color: '#3c57f0'
  },
  topButtonBox: {
    height: 100,
    display: "flex",
    padding: 8,
    justifyContent: "flex-end"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  signInGrid: {
    margin: `${theme.spacing(0, 4)}px auto`,
    padding: theme.spacing(0, 8),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    padding: '10px 40px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
}));

const Login = (props) => {
  const history = useHistory();
  const { user, login } = props;
  const classes = useStyles();

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />

      <Grid item xs={false} sm={5} md={6} className={classes.image} />
      <Grid item xs={12} sm={7} md={6} className={classes.signInGrid} component={Paper} elevation={6} square>
        <Box
          component="span"
          m={1} //margin
          className={`${classes.topButtonBox}`}
        >
          <Box
            component="span"
            m={3} //margin
          >
            <Typography
              className={classes.disabled}
            >
              Don’t have an account?
            </Typography>
          </Box>


          <Button
            variant="contained"
            className={classes.ButtonShade}
            onClick={() => history.push("/register")}
          > Create Account
          </Button>
        </Box>
        <Box className={classes.paper}
        >
          <Typography
            component="h1"
            variant="h5"
          >
            <Box fontWeight="fontWeightBold" m={1}>
              Welcome back!
            </Box>

          </Typography>
          <form onSubmit={handleLogin}>
            <Grid>
              <FormControl fullWidth margin="normal" required>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
                />
              </FormControl>
            </Grid>
            <FormControl fullWidth margin="normal" required>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="password"
                aria-label="password"
                type="password"
                name="password"
              />
            </FormControl>
            <Box textAlign='center'>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Login
              </Button>
            </Box>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
