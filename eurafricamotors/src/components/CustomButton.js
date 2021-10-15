import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: "#3C9BD8",
        marginTop: "50px",
        height: "50px",
        width: "175px"
    },
    text: {
        fontWeight: "bold"
    }
}));

export default function CustomButton(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Button onClick={props.onClick}
                type={props.type}
                className={classes.button}
                variant="contained"
                component={props.component}>
                <Typography className={classes.text}
                    variant="body1">
                    {props.text}
                </Typography>
            </Button>
        </div>
    );
}