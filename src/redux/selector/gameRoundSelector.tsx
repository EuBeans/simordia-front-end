import {createSelector} from 'reselect';
import {RootState} from '../app/store';



export const getAllGameRounds = (state: RootState) => state.gameRound.allGameRounds;
export const getCurrentGameRound = (state: RootState) => state.gameRound.currentGameRound;
export const getCurrentRoundLoading = (state: RootState) => state.gameRound.loading;


