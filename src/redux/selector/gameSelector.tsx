import {createSelector} from 'reselect';
import {RootState} from '../app/store';



export const getAllGames = (state: RootState) => state.game.allGames;
export const getCurrentGame = (state: RootState) => state.game.currentGame;
export const getLoading = (state: RootState) => state.game.loading;
export const getError = (state: RootState) => state.game.error;
export const getCurrentScore = (state: RootState) => state.game.currentScore;
export const getCurrentGameRoundTime = (state: RootState) => state.game.gameRoundTime;
export const getIsGameDone = (state: RootState) => state.game.isGameDone;
