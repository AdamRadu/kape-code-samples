import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router";

import CustomAppBar from "../components/AppBar"
import LoginPaper from "../components/papers/LoginPaper"

const useStyles = makeStyles((theme) => ({
  root:{
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  loginForm: {
    padding: "200px 0",
    textAlign: "center"
  },
}));

export default function Login() {
  const classes = useStyles();
  const history = useHistory()
  const location = history.location.pathname

  return <div className={classes.root}>
    <CustomAppBar location={location} />
    <Grid className={classes.loginForm}
      container
      direction="row"
      justifyContent="center"
      alignItems="center">

      <LoginPaper />

    </Grid>
  </div>
}