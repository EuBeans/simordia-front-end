import {createSelector} from 'reselect';
import {RootState} from '../app/store';



export const getAllGames = (state: RootState) => state.game.allGames;
export const getCurrentGame = (state: RootState) => state.game.currentGame;