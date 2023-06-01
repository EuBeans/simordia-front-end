import react, { useEffect } from 'react';

import { useAppSelector } from '../utils/useAppDispatch';
import { getCurrentGame, getCurrentGameRoundTime} from '../redux/selector/gameSelector';
import { Game as GameModel } from '../model/gameModel';
import { Box, Button, CircularProgress, Container, Grid, Typography } from '@mui/material';
import { theme } from '../assets/theme';
import { styled } from '@mui/material/styles';
import { useAppDispatch } from '../utils/useAppDispatch';
import { getCurrentGameRound, getCurrentRoundTime, getRoundPause } from '../redux/selector/gameRoundSelector';
import GameRound from './gameRound';
import { updateModel } from '../services/gameService';
import { createGameRoundAction, endGameRoundAction } from '../redux/actions/gameRoundSlice';
import { EndGameRoundInput, GameRoundInput, GameRoundStatus } from '../model/gameRoundModel';
import { getCurrentScore} from '../redux/selector/gameSelector';
import RoundTimer from './roundTimer';
import React from 'react';
import { getIsGameDoneAction } from '../redux/actions/gameSlice';

export const convertUTCDateToLocalDate =(date: any) =>{
    var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;   
}


export default function GameLoader() {


    const currentGame = useAppSelector(getCurrentGame);
    const currentGameRound = useAppSelector(getCurrentGameRound);
    const currentGameScore = useAppSelector(getCurrentScore);
    const isRoundPaused = useAppSelector(getRoundPause);

    const dispatch = useAppDispatch();

    const [loadingModel, setLoadingModel] = react.useState(false);
    const [modelLoaded, setModelLoaded] = react.useState(false);
       
    const [currentRoundTime, setCurrentRoundTime] = react.useState(0);
    const [progress, setProgress] = react.useState(0);

    const duration = useAppSelector(getCurrentGameRoundTime) || 0;



    const [timeInterval , setTimeInterval] = react.useState<NodeJS.Timer| undefined>(undefined);

    useEffect(() => {
        if(currentGameRound ){
            var start_time = convertUTCDateToLocalDate(new Date(currentGameRound.start_time));
            const end_time = new Date(start_time.getTime() + (duration * 1000)); // Calculate the end time by adding the duration to the start time

            const countdownInterval = setInterval(() => {
                const now = new Date(); // Get the current time
                const end_time_total_seconds = end_time.getMinutes() * 60 + end_time.getSeconds();
                const now_total_seconds = now.getMinutes() * 60 +  now.getSeconds();
                const diffInSeconds = end_time_total_seconds- now_total_seconds        
                if (diffInSeconds <= 0) { // If the countdown is over, clear the interval
                    clearInterval(countdownInterval);     
                    const gameRoundInput: EndGameRoundInput = {
                        game_round_id: currentGameRound.round_id,
                        status: GameRoundStatus.timed_out,
                    }

                    dispatch(endGameRoundAction(gameRoundInput));
                    dispatch(getIsGameDoneAction(currentGameRound?.game_id ));

                } else {
                    setCurrentRoundTime(diffInSeconds);
                    setProgress((diffInSeconds/duration)*100);
                }
            }, 500);

            setTimeInterval(countdownInterval);

                
        }
    }, [currentGameRound]);


    useEffect(() => {
        console.log(isRoundPaused)
        if(isRoundPaused){
            pauseTimer();
        } 
    }, [isRoundPaused]);

    const pauseTimer = () => {
        if(timeInterval){
            clearInterval(timeInterval);
            setTimeInterval(undefined);
        }
    }


    
    const GameLoaderStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "100%",
        width: "100%",
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
    };

    const HeaderTextStyle = {
        fontFamily: theme.typography.fontFamily2,
        fontSize: theme.typography.h1.fontSize,
        color: theme.palette.text.primary,
        textAlign: "center",
    };

    const ScoreTextStyle = {
        fontFamily: theme.typography.fontFamily2,
        fontSize: theme.typography.h2.fontSize,
        color: theme.palette.quadrary.main,
        textAlign: "center",
    };
    const UpdateModelButtonStyle = {
        fontFamily: theme.typography.fontFamily2,
        fontSize: theme.typography.h2.fontSize,
        color: theme.palette.quadrary.main,
        textAlign: "center",
        backgroundColor: theme.palette.background.paper,
        border: '1px solid',
        borderColor: theme.palette.quadrary.main,
        //hover
        '&:hover': {
            backgroundColor: theme.palette.quadrary.main,
            color: theme.palette.background.paper,
        },
    }
    
    const NoRoundBoxStyle= {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
    }



    //function to update model
    const updateMlModel = () => {
        setLoadingModel(true);
        updateModel().then((response) => {
            setModelLoaded(true);
        })
    }


    const createGameRound = () => {
        if(!currentGame) return;
        const gameRoundInput : GameRoundInput = {
            game_id: currentGame?.game_id,
        }
        dispatch(createGameRoundAction(gameRoundInput));
    }

    return (
        <Box sx={GameLoaderStyle}>
            <Container maxWidth={"sm"} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' , position: 'sticky', top: 0, zIndex:'3'}}>
                <Grid xs={6}>
                    <RoundTimer time={currentRoundTime} progress={progress}/>
                </Grid>
                <Grid xs={6} sx={{display:'flex',mr:'35%', ml:'20%'}}>
                    <Typography sx={HeaderTextStyle}>Simordia</Typography>
                </Grid>
            </Container>

            <Grid>
                <Typography sx={ScoreTextStyle}>Score: {currentGameScore}</Typography>
            </Grid>
            {currentGameRound ? <GameRound />:
            
            <Grid sx={NoRoundBoxStyle}>
                <Typography sx={HeaderTextStyle}>No Game Round</Typography>
                {!loadingModel  && <Button  sx={UpdateModelButtonStyle} onClick={updateMlModel}>Update Model</Button>}
                {!modelLoaded && loadingModel ? <CircularProgress /> :
                    <Button sx={UpdateModelButtonStyle} onClick={createGameRound}>New Round</Button>
                }
            </Grid>
            }

        </Box>

    )
}