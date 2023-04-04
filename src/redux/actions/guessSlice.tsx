import {createSlice} from '@reduxjs/toolkit';


export const guessSlice = createSlice({
  name: 'guess',
  initialState: {
    guessWord: '',
  },
  reducers: {
    setGuessWord: (state, action) => {
      state.guessWord = action.payload;
    }
  }
});

export const {setGuessWord} = guessSlice.actions;