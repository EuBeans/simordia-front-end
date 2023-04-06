import {configureStore} from '@reduxjs/toolkit';
import {gameSlice} from '../actions/gameSlice';
import {authSlice} from '../actions/authSlice';
import {gameRoundSlice} from '../actions/gameRoundSlice';
import {roundWordSlice} from '../actions/roundWordSlice';
export const store = configureStore({
  reducer: {
    game: gameSlice.reducer,
    auth: authSlice.reducer,
    gameRound: gameRoundSlice.reducer,
    roundWord: roundWordSlice.reducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;