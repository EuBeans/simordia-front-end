import react from 'react';

import { useAppSelector } from '../utils/useAppDispatch';
import { getAllGames ,getCurrentGame} from '../redux/selector/gameSelector';
import { Game as GameModel } from '../model/gameModel';
import { Box, Button, Grid, Typography } from '@mui/material';
import { theme } from '../assets/theme';
import { styled } from '@mui/material/styles';
import { useAppDispatch } from '../utils/useAppDispatch';
import { getCurrentGameRound } from '../redux/selector/gameRoundSelector';

import GameRound from './gameRound';


export default function GameLoader() {


    const currentGame = useAppSelector(getCurrentGame);
    const currentGameRound = useAppSelector(getCurrentGameRound);


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


    
    return (
        <Box sx={GameLoaderStyle}>
            <Grid>
                <Typography sx={HeaderTextStyle}>Simordia</Typography>
            </Grid>
            <Grid>
                <Typography sx={ScoreTextStyle}>Score: {currentGame?.score}</Typography>
            </Grid>
            
            <GameRound />
        </Box>

    )
}