import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {createNewGameRound,getAllGameRounds} from "../../services/gameRoundService";
import { GameRound,GameRoundInput,GameRoundListResponse,GameRoundResponse,GameRoundStatus} from "../../model/gameRoundModel";


import { useEffect } from "react";

export interface GameRoundState {
    allGameRounds: GameRound[];
    currentGameRound: GameRound | undefined;
    loading: boolean;
    error: string | undefined;
}

const initialState: GameRoundState = {
    allGameRounds: [],
    currentGameRound: undefined,
    loading: false,
    error: undefined,
};

export const createGameRoundAction = createAsyncThunk(
    "gameRound/createGameRound",
    async (gameRound: GameRoundInput) => {
        const response = await createNewGameRound(gameRound);
        return response;
    }
);

export const getAllGameRoundsAction = createAsyncThunk(
    "gameRound/getAllGameRounds",
    async (game_id: string) => {
        const response = await getAllGameRounds(game_id);
        return response;
    }
);

export const gameRoundSlice = createSlice({
    name: "gameRound",
    initialState,
    reducers: {
        setCurrentGameRound: (state, action) => {
            state.currentGameRound = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createGameRoundAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(createGameRoundAction.fulfilled, (state, action) => {
            state.loading = false;
            state.currentGameRound = action.payload.game_round;
        });
        builder.addCase(createGameRoundAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(getAllGameRoundsAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getAllGameRoundsAction.fulfilled, (state, action) => {
            state.loading = false;
            state.allGameRounds = action.payload.data;
        });
        builder.addCase(getAllGameRoundsAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
});

export const { setCurrentGameRound } = gameRoundSlice.actions;

export default gameRoundSlice.reducer;
