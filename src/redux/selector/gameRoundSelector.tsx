import {createSelector} from 'reselect';
import {RootState} from '../app/store';



export const getAllGameRounds = (state: RootState) => state.gameRound.allGameRounds;
export const getCurrentGameRound = (state: RootState) => state.gameRound.currentGameRound;
export const getCurrentRoundLoading = (state: RootState) => state.gameRound.loading;
export const getCurrentRoundError = (state: RootState) => state.gameRound.error;
export const getCurrentRoundTime = (state: RootState) => state.gameRound.currentRoundTime;
export const getRoundPause = (state: RootState) => state.gameRound.roundPause;


