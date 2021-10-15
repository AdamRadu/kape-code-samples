import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CustomTextField from '../CustomTextField';
import CustomButton from '../CustomButton';
import CustomizedSnackbar from '../CustomSnackbar';
import * as controller from '../../cars/controller'
import { Link, useHistory } from 'react-router-dom';
import bcrypt from 'bcryptjs'

// all the css for the login page
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        width: "100%",
        margin: "10px"
    },
    paper: {
        borderRadius: "5px",
        width: "100%",
        height: "300px"
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

export default function AddPaper() {
    const classes = useStyles()
    const [url, setUrl] = useState()
    const [snackbarText, setSnackbarText] = useState()
    const [snackbarType, setSnackbarType] = useState()
    const [open, setOpen] = useState(false)

    const handleChange = (value) => {
        setUrl(value)
    }

    const validateUrl = (str) => {
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(str);
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (validateUrl(url)) {
            const metadata = await controller.saveCarByUrl(url)
        } else {
            setOpen(true)
            setSnackbarType("error")
            setSnackbarText("Plaease provide a valid url!")
        }
    }
    return (<div className={classes.root}>
        <Paper elevation={3}
            className={classes.root}>
            <Grid container
                className={classes.paper}
                direction="column">
                <Grid item
                    className={classes.titleBackground}>
                    <Typography className={classes.title}
                        variant="h5" >
                        Add new car
                    </Typography>
                </Grid>
                <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <CustomTextField placeholder="url"
                        saveValue={handleChange} />
                    <CustomButton type="submit" text={"Save Url"}/>
                </form>
            </Grid>
        </Paper>
    </div>)
}