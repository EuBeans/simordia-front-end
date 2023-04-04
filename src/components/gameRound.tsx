import react from 'react';
import { useAppSelector } from '../utils/useAppDispatch';
import { getAllGames ,getCurrentGame} from '../redux/selector/gameSelector';
import { Game as GameModel } from '../model/gameModel';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { theme } from '../assets/theme';
import { styled } from '@mui/material/styles';
import { useAppDispatch } from '../utils/useAppDispatch';
import { getCurrentGameRound } from '../redux/selector/gameRoundSelector';
import GuessInput from './guessInput';

const GameRound = () => {

    const currentGameRound = useAppSelector(getCurrentGameRound);


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



    return (
        <Container sx={GameRoundContainerStyle}>
            <Box sx={InfoBoxStyle}>
                <Typography sx={InfoHeaderStyle}>Round: {currentGameRound?.round_number}</Typography>
                <Typography sx={InfoHeaderStyle}>Guesses: {currentGameRound?.number_of_guesses}</Typography>
            </Box>

            <Box sx={InputBoxStyle}>
                <GuessInput/>
            </Box>
            
            
        </Container>



    )

}

export default GameRound