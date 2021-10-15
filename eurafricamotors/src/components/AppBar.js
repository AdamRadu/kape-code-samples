import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    bar: {
        backgroundColor: "#3C9BD8",
    },
    title: {
        flexGrow: 1,
        position: "relative"
    },
    menuButton: {
        marginRight: "8px",
    },
    emptyButton: {
        marginRight: "20px",
    },
}));

export default function CustomAppBar(props) {
    const history = useHistory()
    const classes = useStyles();
    const location = props.location
    const user = props.user



    const handleBackClick = () => {
        history.goBack()
    }

    const displayLogin = (user, location) => {
        if (user) {
            if (user.type === "admin") {
                return false
            }
        }
        if (location !== "/") {
            return false
        }
        return true
    }

    const displayAddButton = (user, location) => {
        if (!displayLogin(user, location) && location === "/") {
            return true
        }
        else { return false }
    }

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.bar}>
                <Toolbar>
                    <IconButton onClick={handleBackClick} className={classes.menuButton} color="inherit" aria-label="menu">
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        EurafricaMotors
                    </Typography>
                    {
                        displayLogin(user, location) ?
                            <IconButton component={Link} to="/login" edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                <AccountCircleIcon />
                            </IconButton> : displayAddButton(user, location) ?

                                <IconButton component={Link} to="/add" edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                    <AddCircleOutlineIcon />
                                </IconButton>
                                
                                : <IconButton disabled={true} className={classes.emptyButton} color="inherit" aria-label="menu">
                                </IconButton>
                    }
                </Toolbar>
            </AppBar>
        </div>
    );
}