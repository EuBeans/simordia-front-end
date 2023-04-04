import {configureStore} from '@reduxjs/toolkit';
import {guessSlice} from '../actions/guessSlice';
import {gameSlice} from '../actions/gameSlice';
import {authSlice} from '../actions/authSlice';
import {gameRoundSlice} from '../actions/gameRoundSlice';

export const store = configureStore({
  reducer: {
    guess: guessSlice.reducer,
    game: gameSlice.reducer,
    auth: authSlice.reducer,
    gameRound: gameRoundSlice.reducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;