//react component for the input guess field
import * as React from 'react';
import {useState} from 'react';
import {createRoundWord} from '../redux/actions/roundWordSlice';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {theme} from '../assets/theme';
import { getCurrentGameRound} from '../redux/selector/gameRoundSelector';
import { useAppDispatch, useAppSelector } from '../utils/useAppDispatch';
import {RoundWordInput} from '../model/roundWordModel';
export default function GuessInput() {
    const [guess, setGuess] = useState('');
    const dispatch = useAppDispatch();
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGuess(event.target.value);
    };

    const currentGameRound =  useAppSelector(getCurrentGameRound);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        //dispatch(setCurrentRoundWord(''));
        if(currentGameRound){
            const roundWordInput: RoundWordInput = {
                round_id: currentGameRound.round_id,
                word: guess
            }
            dispatch(createRoundWord(roundWordInput));
        }

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
        px: 2,

    }

    const CssTextField = {
        color: theme.palette.text.primary,

        //change backgroundcolor 
        backgroundColor: theme.palette.background.paper,
        

        '& label.Mui-focused': {
            color: theme.palette.quadrary.main,
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: theme.palette.quadrary.main,
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: theme.palette.primary.light,
                borderRadius: 1,
            },
            '&:hover fieldset': {
                borderColor: theme.palette.quadrary.main,
            },
            '&.Mui-focused fieldset': {
                borderColor: theme.palette.quadrary.main,
            },
        },
    }

    const inputPlaceHolderTextStyle = {
        color: theme.palette.text.primary,
        fontSize: theme.typography.h5.fontSize,
        fontWeight: theme.typography.h5.fontWeight,
        fontFamily: theme.typography.fontFamily,
        
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
                label="Type Here"
                id="outlined-basic"
                variant="outlined"
                value={guess}
                onChange={handleChange}
                InputLabelProps={{style: inputPlaceHolderTextStyle}}
                inputProps={{style: inputPlaceHolderTextStyle}}
            />
        </Box>
    );
}





