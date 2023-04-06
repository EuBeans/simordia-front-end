import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Slider,
  Switch,
  Typography,
} from "@mui/material";
import {theme} from "../assets/theme";
import { styled } from '@mui/material/styles';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import GameMenu from "./gameMenu";
import { useAppDispatch, useAppSelector } from "../utils/useAppDispatch";
import {getCurrentGame} from '../redux/selector/gameSelector';
import GameManager from "../managers/gameManager";
import { GameStatus } from "../model/gameModel";
import GameLoader from "./gameLoader";

const GameContainer = () => {
    const currentGame = useAppSelector(getCurrentGame);

    const [gameOn, setGameOn] = useState(false);

    const GameContainerStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
    };

    const GameBoxBorderStyle = {
        border: "2px solid",
        borderColor: theme.palette.quadrary.main,
        borderRadius: "10px",
        padding: "10px",
        width: "80%",
        height: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
    };

    useEffect(() => {
        if(currentGame?.game_status === GameStatus.in_progress){
            setGameOn(true);
        }else{
            setGameOn(false);
        }
    }, [currentGame]);

    
    return (
        <Box sx={GameContainerStyle}>
            <GameManager/>
            <Container maxWidth={"lg"} sx={GameBoxBorderStyle}>
                {!gameOn &&  <GameMenu /> }
                {gameOn && <GameLoader/>}
            </Container>
        </Box>
    );
};

export default GameContainer;
