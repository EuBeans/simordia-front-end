//game manager is the one that is responsible for the game logic and the game redux state

import  { useEffect } from 'react';
import { getAllGamesAction, getCurrentGameScoreAction, setCurrentGame, setIsGameDone, setShowScoreBoard} from '../redux/actions/gameSlice';
import { useAppDispatch, useAppSelector } from '../utils/useAppDispatch';
import {getAllGames, getCurrentGame, getIsGameDone, getShowScoreBoard } from '../redux/selector/gameSelector';
import { GameStatus } from '../model/gameModel';
import { getAllGameRoundsAction, setCurrentGameRound, setRoundPause, endGameRoundAction, } from '../redux/actions/gameRoundSlice';
import { getCurrentGameRound, getAllGameRounds,getCurrentRoundLoading } from '../redux/selector/gameRoundSelector';
import {fetchAllRoundWords, setCurrentRoundWord} from '../redux/actions/roundWordSlice';
import { EndGameRoundInput, GameRoundStatus} from '../model/gameRoundModel';
import { getCurrentRoundWord } from '../redux/selector/roundWordSelector';
import { isEqual } from 'lodash';

export default function GameManager() {

    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
    const allGames = useAppSelector(getAllGames);
    const currentGame = useAppSelector(getCurrentGame);
    const currentGameRound = useAppSelector(getCurrentGameRound);
    const allGameRounds = useAppSelector(getAllGameRounds);
    const currentRoundLoading = useAppSelector(getCurrentRoundLoading);
    const isGameDone = useAppSelector(getIsGameDone);
    const currentGameWord = useAppSelector(getCurrentRoundWord);
    const ShowScoreBoard = useAppSelector(getShowScoreBoard);
    const dispatch = useAppDispatch();


    useEffect(() => {
        if(isAuthenticated){
            dispatch(getAllGamesAction());
        }
    }, [isAuthenticated]);

    useEffect(() => {
        //if AllGamesIs updated, check if there is a game in progress, if there is, then set the game state to that game
        if(allGames.length > 0){
            const gameInProgress = allGames.find((game) => game.game_status === GameStatus.in_progress);
            
            if(gameInProgress){
                //check if current game != gameInProgress, if it is not, then set the current game to gameInProgress
                if((currentGame && !isEqual(currentGame,gameInProgress)) || !currentGame){
                    dispatch(setCurrentGame(gameInProgress));
                } 
            }
        } 
    }, [allGames,currentGame]);


    useEffect(() => {
        if(currentGame){
            dispatch(getAllGameRoundsAction(currentGame.game_id));
        }
    }, [currentGame]);


    useEffect(() => {
        // check if there is a round in progress, if there is, then set the current round to that round
        // fetch all the words for that round
        if(allGameRounds.length > 0 && !currentRoundLoading){
            const gameRoundInProgress = allGameRounds.find((gameRound) => gameRound.status === GameRoundStatus.in_progress);
            if(gameRoundInProgress){
                //check if current game round != gameRoundInProgress, if it is not, then set the current game round to gameRoundInProgress
                if((currentGameRound && currentGameRound.round_id !== gameRoundInProgress.round_id) || !currentGameRound){
                    dispatch(setCurrentGameRound(gameRoundInProgress));
                    dispatch(fetchAllRoundWords(gameRoundInProgress.round_id));
                    dispatch(setCurrentRoundWord(undefined))
                }
            }
        }
    }, [allGameRounds, currentGameRound, currentRoundLoading]);
    
    //check if current game round is completed, if it is, set the new score
    useEffect(() => {
        if(currentGame && currentGameWord && currentGameWord.distance === 0){
            dispatch(setRoundPause(true));
            dispatch(getCurrentGameScoreAction(currentGame.game_id));
            if(currentGameRound?.round_number === currentGame?.max_round_number){
                dispatch(setIsGameDone(true));
            }
        }
    }, [currentGameWord]);

    //check too see if the game is getIsGameDone
    useEffect(() => {
        if(currentGame && isGameDone && !ShowScoreBoard ){
            //TODO: show the game summary

            if(currentGameRound && currentGameRound.status === GameRoundStatus.in_progress){
                const gameRoundInput: EndGameRoundInput = {
                    game_round_id: currentGameRound.round_id,
                    status: GameRoundStatus.completed,
                }
                dispatch(endGameRoundAction(gameRoundInput));
            }
            dispatch(setShowScoreBoard(true));
            
        }
    }, [isGameDone,ShowScoreBoard, currentGameRound]);



    
    return (
        <></>
    )
}
