//react component for the input guess field
import * as React from 'react';
import {useState} from 'react';
import {useAppDispatch} from '../utils/useAppDispatch';
import {setGuessWord} from '../redux/actions/guessSlice';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {theme} from '../assets/theme';
import { styled } from '@mui/material/styles';

export default function GuessInput() {
    const [guess, setGuess] = useState('');
    const dispatch = useAppDispatch();
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGuess(event.target.value);
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(setGuessWord(guess));
        setGuess('');
    };

    const InputBoxStyle = {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,

    }

    const CssTextField = {
        color: theme.palette.text.primary,
        '& label.Mui-focused': {
            color: theme.palette.secondary.main,
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: theme.palette.secondary.main,
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: theme.palette.primary.light,
            },
            '&:hover fieldset': {
                borderColor: theme.palette.secondary.main,
            },
            '&.Mui-focused fieldset': {
                borderColor: theme.palette.secondary.main,
            },
        },
    }
    
    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={InputBoxStyle}
            onSubmit={handleSubmit}
        >
            <TextField
                sx={CssTextField}
                fullWidth 
                label="Guess"
                id="outlined-basic"
                variant="outlined"
                value={guess}
                onChange={handleChange}
                InputLabelProps={{style: {color: theme.palette.text.primary}}}
                inputProps={{style: {color: theme.palette.text.primary}}}
            />
        </Box>
    );
}





