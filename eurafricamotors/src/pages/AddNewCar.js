import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router";

import CustomAppBar from "../components/AppBar"
import AddPaper from "../components/papers/AddPaper"

const useStyles = makeStyles((theme) => ({
  root:{
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  form: {
    textAlign: "center"
  },
}));

export default function AddNewCar() {
  const classes = useStyles();
  const history = useHistory()
  const location = history.location.pathname

  return <div className={classes.root}>
    <CustomAppBar location={location} />
    <Grid className={classes.form}
      container
      direction="row"
      justifyContent="center"
      alignItems="center">

      <AddPaper />

    </Grid>
  </div>
}