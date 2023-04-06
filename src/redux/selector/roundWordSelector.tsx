import {createSelector} from 'reselect';
import {RootState} from '../app/store';



export const getAllRoundWords = (state: RootState) => state.roundWord.allRoundWords;
export const getCurrentRoundWord = (state: RootState) => state.roundWord.currentRoundWord;
export const getLoading = (state: RootState) => state.roundWord.loading;
export const getError = (state: RootState) => state.roundWord.error;
