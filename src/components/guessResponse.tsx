import * as React from 'react';
import {useAppSelector} from '../utils/useAppDispatch';
import Box from '@mui/material/Box';
import {theme} from '../assets/theme';
import { Grid, List, Typography } from '@mui/material';
import DistanceBar from './distanceBar';
import { getCurrentRoundWord, getLoading, getError } from '../redux/selector/roundWordSelector';


const MAX_DISTANCE = 700;
export default function GuessResponse() {

    const currentGuess = useAppSelector(getCurrentRoundWord);
    const isLoading = useAppSelector(getLoading);
    const wordError = useAppSelector(getError);
    const loadingResponse = [400,"Calculating...",];
    const errorResponse = wordError ? [400,wordError] : [];
    
    const responseBoxStyle = {
        width: "100%",
        height: "100%",
        paddingX: 2,
    }

    const responseTextStyle = {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        color: theme.palette.text.primary,
        fontSize: theme.typography.h5.fontSize,
        fontWeight: theme.typography.h5.fontWeight,
        fontFamily: theme.typography.fontFamily,

    }
    

    return (
        <Grid  sx={responseBoxStyle}>
            

            {currentGuess === undefined && isLoading ?
                <Typography variant="h5" sx={responseTextStyle}>
                    {loadingResponse}
                </Typography>
                :
                currentGuess  &&  !wordError  ?
                    <List>
                        <DistanceBar word={currentGuess.word} distance={currentGuess.distance} maxDistance={MAX_DISTANCE}/>
                    </List>
                    :
                    wordError ?
      
                        <Typography variant="h5" sx={responseTextStyle}>
                            {errorResponse}
                        </Typography> 
                        : null
            }
                
        </Grid>
    );
}
    


