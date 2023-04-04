import {createSelector} from 'reselect';
import {RootState} from '../app/store';


export const getAllGuessedWords = (state: RootState) => state.guess.guessWord;


