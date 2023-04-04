//game manager is the one that is responsible for the game logic and the game redux state

import react, { useEffect, useState } from 'react';
import { getAllGamesAction, setAllGames, setCurrentGame } from '../redux/actions/gameSlice';
import { useAppDispatch, useAppSelector } from '../utils/useAppDispatch';
import {getAllGames, getCurrentGame} from '../redux/selector/gameSelector';
import { Game, GameStatus } from '../model/gameModel';
import { all } from 'axios';
import { createGameRoundAction, getAllGameRoundsAction, setCurrentGameRound} from '../redux/actions/gameRoundSlice';
import { getCurrentGameRound, getAllGameRounds,getCurrentRoundLoading } from '../redux/selector/gameRoundSelector';
import {GameRoundInput, GameRoundStatus} from '../model/gameRoundModel';
export default function GameManager() {

    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
    const allGames = useAppSelector(getAllGames);
    const currentGame = useAppSelector(getCurrentGame);
    const currentGameRound = useAppSelector(getCurrentGameRound);
    const allGameRounds = useAppSelector(getAllGameRounds);
    const currentRoundLoading = useAppSelector(getCurrentRoundLoading);


    const dispatch = useAppDispatch();
    const [previousGame, setPreviousGame] = useState<Game | undefined>(undefined);



    useEffect(() => {
        if(isAuthenticated){
            dispatch(getAllGamesAction());
        }
    }, [isAuthenticated]);


    useEffect(() => {
        if(currentGame){
            dispatch(getAllGameRoundsAction(currentGame.game_id));
        }
    }, [currentGame]);
    

    useEffect(() => {

        //currentGame && dispatch(getAllGameRoundsAction(currentGame.game_id));
        if(allGameRounds.length > 0 && !currentRoundLoading){
            const gameRoundInProgress = allGameRounds.find((gameRound) => gameRound.status === GameRoundStatus.in_progress);
            if(gameRoundInProgress){
                dispatch(setCurrentGameRound(gameRoundInProgress));
            }
        }
    }, [currentGame, allGameRounds, currentRoundLoading]);
    

    useEffect(() => {
        //if AllGamesIs updated, check if there is a game in progress, if there is, then set the game state to that game
        if(allGames.length > 0){
            const gameInProgress = allGames.find((game) => game.game_status === GameStatus.in_progress);
            if(gameInProgress){
                dispatch(setCurrentGame(gameInProgress));
            }
        }        
    }, [allGames]);

    useEffect(() => {
        if(currentGame){
            
            //check if current_game is completed, if it is, then set the current_game to undefined
            if(currentGame.game_status === GameStatus.completed){
                dispatch(setCurrentGame(undefined));
            }
            //check if current game is in allgames array, if it is not, then add it to the array
            const gameInAllGames = allGames.find((game) => game.game_id === currentGame.game_id);

            if(!gameInAllGames){
                dispatch(getAllGamesAction());
            }    
            
        }
    }, [currentGame]);



    return (
        <></>
    )
}