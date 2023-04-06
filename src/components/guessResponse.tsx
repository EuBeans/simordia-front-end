import * as React from 'react';
import {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../utils/useAppDispatch';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {theme} from '../assets/theme';
import { Container, Grid, List, ListItem, ListItemText, styled, Typography } from '@mui/material';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import DistanceBar from './distanceBar';
import Typical from 'react-typical'
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
        marginY:1,
    }

    const responseTextStyle = {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        color: theme.palette.text.primary,
        fontSize: theme.typography.h5.fontSize,
        fontWeight: theme.typography.h5.fontWeight,
        fontFamily: theme.typography.fontFamily,
        paddingTop: 2,

    }
    

    return (
        <Grid  sx={responseBoxStyle}>
            

            {currentGuess === undefined && isLoading ?
                <Typography variant="h5" sx={responseTextStyle}>
                    <Typical
                        steps={loadingResponse}
                        loop={1}
                        wrapper="span"
                    />
                </Typography>
                :
                currentGuess  &&  !wordError  ?
                    <List>
                        <DistanceBar word={currentGuess.word} distance={currentGuess.distance} maxDistance={MAX_DISTANCE}/>
                    </List>
                    :
                    wordError ?
      
                        <Typography variant="h5" sx={responseTextStyle}>
                            <Typical

                                steps={errorResponse}
                                loop={1}
                                wrapper="span"
                            />
                        </Typography> 
                        : null
            }
                
        </Grid>
    );
}
    


