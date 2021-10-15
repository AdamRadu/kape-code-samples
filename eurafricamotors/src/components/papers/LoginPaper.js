import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CustomTextField from '../CustomTextField';
import CustomButton from '../CustomButton';
import CustomizedSnackbar from '../CustomSnackbar';
import * as controller from '../../user/contorller'
import { Link, useHistory } from 'react-router-dom';
import bcrypt from 'bcryptjs'

// all the css for the login page
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    paper: {
        borderRadius: "5px",
        width: "300px",
        height: "400px"
    },
    title: {
        marginTop: "10px"
    },
    titleBackground: {
        borderRadius: "2.5px",
        height: "50px",
        backgroundColor: "#3C9BD8",
    },
    form: {
        '& label.Mui-focused': {
            color: "#3C9BD8",
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: "#3C9BD8",
        },
        '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
                borderColor: "#3C9BD8",
            },
            '&.Mui-focused fieldset': {
                borderColor: "#3C9BD8",
            },
        },
    }
}));

export default function LoginPaper() {
    const classes = useStyles();
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [snackbarText, setSnackbarText] = useState()
    const [snackbarType, setSnackbarType] = useState()
    const [open, setOpen] = useState(false)

    const history = useHistory();

    async function compareIt(hashedPassword, password) {
        const validPassword = await bcrypt.compare(hashedPassword, password);
        return validPassword
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (username && password) {
            const retrievedUser = await controller.getUserByUsername(username)
            if (username === retrievedUser.username && await compareIt(password, retrievedUser.password)) {
                history.push({
                    pathname: "/",
                    state: {
                        response: retrievedUser
                    }
                });
            } else {
                setOpen(true)
                setSnackbarType("error")
                setSnackbarText("Wrong username or password!")
            }
        } else {
            if (username === undefined) {
                setOpen(true)
                setSnackbarType("error")
                setSnackbarText("Plaease provide a username!")
            } else if (password === undefined) {
                setOpen(true)
                setSnackbarType("error")
                setSnackbarText("Plaease provide a password!")
            }
        }
    }

    const closeSnackbar = () => {
        setOpen(false)
    }

    const handlePasswordChange = (value) => {
        setPassword(value)
    }

    const handleUsernameChange = (value) => {
        setUsername(value)
    }

    return (
        <div className={classes.root}>
            <Paper elevation={3}
                className={classes.root}>
                <Grid container
                    className={classes.paper}
                    direction="column">
                    <Grid item
                        className={classes.titleBackground}>
                        <Typography className={classes.title}
                            variant="h5" >
                            Login
                        </Typography>
                    </Grid>
                    <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
                        <CustomTextField placeholder="Username"
                            saveValue={handleUsernameChange} />
                        <CustomTextField type="password"
                            placeholder="Password"
                            saveValue={handlePasswordChange} />
                        <CustomButton type="submit" text={"Login"} />
                    </form>
                </Grid>
            </Paper>
            {open === true ? <CustomizedSnackbar open={open}
                text={snackbarText}
                severity={snackbarType}
                closeSnackbar={closeSnackbar} />
                : ""}
        </div>
    );
}



