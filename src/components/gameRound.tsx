import react from 'react';
import { useAppSelector } from '../utils/useAppDispatch';
import { getCurrentGame} from '../redux/selector/gameSelector';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { theme } from '../assets/theme';
import { useAppDispatch } from '../utils/useAppDispatch';
import { getCurrentGameRound } from '../redux/selector/gameRoundSelector';
import { getAllRoundWords, getCurrentRoundWord } from '../redux/selector/roundWordSelector'
import GuessInput from './guessInput';
import WordList from './wordList';
import GuessResponse from './guessResponse';
import {getAllGameRoundsAction, setRoundPause } from '../redux/actions/gameRoundSlice';
import RoundTimer from './roundTimer';
import React from 'react';

const GameRound = () => {

    const currentGameRound = useAppSelector(getCurrentGameRound);
    const allRoundWords = useAppSelector(getAllRoundWords);
    const currentGame = useAppSelector(getCurrentGame);

    const currentGameWord = useAppSelector(getCurrentRoundWord);
    const dispatch = useAppDispatch();

    const InfoHeaderStyle = {
        fontFamily: theme.typography.fontFamily2,
        fontSize: theme.typography.h2.fontSize,
        color: theme.palette.text.primary,
        textAlign: "center",
        mx: 2,
    };
    const GameRoundContainerStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "100%",
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        

    };
    const ButtonBoxStyle = {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
    };



    const InfoBoxStyle = {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
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

    const WordListBoxStyle = {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        overflowY: 'auto',
        width: "100%",
        height: "65vh",
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        
    }

    const GuessResponseBoxStyle = {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    }
    const NextRoundButtonStyle = {
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

    const nextRound = () => {
     
        currentGame?.game_id && dispatch(getAllGameRoundsAction(currentGame?.game_id))
        dispatch(setRoundPause(false))
    }

    const endGame = () => {
        //TODO: end game
    }


    const renderButton = () => {
        if(currentGameWord && currentGameRound && currentGame){
            if(currentGameWord?.distance === 0 && currentGameRound?.round_number < currentGame?.max_round_number){
                return (
                    <Button  sx={NextRoundButtonStyle} onClick={nextRound}>Next Round</Button>
                )
            }else if (currentGameWord?.distance === 0 && currentGameRound?.round_number === currentGame?.max_round_number){
                return (
                    <Button  sx={NextRoundButtonStyle} onClick={nextRound}>End Game</Button>
                )
            }
        }
    }

    const fixedBoxStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        backgroundColor: theme.palette.background.default,

    }

    return (
        <Container maxWidth={'sm'}>
   
            <Box sx={GameRoundContainerStyle}>
                <Grid sx={fixedBoxStyle}>
                        
                    <Box sx={InfoBoxStyle}>
                        <Typography sx={InfoHeaderStyle}>Round: {currentGameRound?.round_number}</Typography>
                        <Typography sx={InfoHeaderStyle}>Guesses: {allRoundWords?.length}</Typography>
                    </Box>
                    <Box sx={InputBoxStyle}>
                        <GuessInput/>
                    </Box>
                    <Box sx={GuessResponseBoxStyle}>
                        <GuessResponse/>
                    </Box>
                </Grid>
                <Grid sx={WordListBoxStyle}>
                    <WordList/>
                </Grid>
                <Grid sx={ButtonBoxStyle}>
                    {renderButton()}
                </Grid>
            </Box>
        </Container>
    )

}

export default GameRound