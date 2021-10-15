import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

// spacing & size css
const useStyles = makeStyles((theme) => ({
    textField: {
        marginTop: "50px",
        height: "50px",
        width: "80%"
    }
}));

export default function CustomTextField(props) {
    const classes = useStyles();
    const placeholder = props.placeholder
    const type = props.type

    const onChange = (event) => {
        if ((event.target.value) && (props.saveValue)) {
            props.saveValue(event.target.value)
        }
    }

    return (
        <TextField className={classes.textField}
            label={placeholder}
            type={type}
            variant="outlined"
            onChange={onChange} />
    );
}