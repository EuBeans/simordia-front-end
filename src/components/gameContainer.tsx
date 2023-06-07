import { useEffect, useState } from "react";
import {
  Box,
  Container,
} from "@mui/material";
import {theme} from "../assets/theme";
import GameMenu from "./gameMenu";
import {  useAppSelector } from "../utils/useAppDispatch";
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
        backgroundColor: theme.palette.background.paper2,
        color: theme.palette.text.primary,
    };

    const GameBoxBorderStyle = {
        border: "2px solid",
        borderColor: theme.palette.quadrary.main,
        backgroundColor: theme.palette.background.default,
        borderRadius: "10px",
        padding: "10px",
        width: "80%",
        height: "95%",
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
