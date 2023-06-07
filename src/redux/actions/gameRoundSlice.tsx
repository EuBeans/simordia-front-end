import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {createNewGameRound,getAllGameRounds,endGameRound, startGameRound} from "../../services/gameRoundService";
import { GameRound,GameRoundInput,GameRoundListResponse,GameRoundResponse,GameRoundStatus} from "../../model/gameRoundModel";


import { useEffect } from "react";

export interface GameRoundState {
    allGameRounds: GameRound[];
    currentGameRound: GameRound | undefined;
    currentRoundTime: number | undefined;
    roundPause: boolean;
    loading: boolean;
    error: string | undefined;
}

const initialState: GameRoundState = {
    allGameRounds: [],
    currentRoundTime: undefined,
    currentGameRound: undefined,
    roundPause: true,
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

export const startGameRoundAction = createAsyncThunk(
    "gameRound/startGameRound",
    async (gameRoundStartIput: {game_id: string}) => {
        const response = await startGameRound(gameRoundStartIput);
        return response;
    }
);

export const endGameRoundAction = createAsyncThunk(
    "gameRound/endGameRound",
    async (endGameRoundInput: {game_round_id: string, status: GameRoundStatus}) => {
        const response = await endGameRound(endGameRoundInput);
        return response;
    }
);

export const gameRoundSlice = createSlice({
    name: "gameRound",
    initialState,
    reducers: {
        setCurrentGameRound: (state, action) => {
            state.currentGameRound = action.payload;
        },
        setCurrentRoundTime: (state, action) => {
            state.currentRoundTime = action.payload;
        },
        setRoundPause: (state, action) => {
            state.roundPause = action.payload;
        },
        setAllGameRounds: (state, action) => {
            state.allGameRounds = action.payload;
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
        builder.addCase(endGameRoundAction.pending, (state, action) => {
            state.loading = true;
        }
        );
        builder.addCase(endGameRoundAction.fulfilled, (state, action) => {
            state.loading = false;
            //update the current game round in the all game rounds array
            
            const index = state.allGameRounds.findIndex((gameRound) => gameRound.round_id === action.payload.prev_game_round.round_id);
            if (index !== -1) {
                state.allGameRounds[index] = action.payload.prev_game_round;
            }
            action.payload.new_game_round && state.allGameRounds.push(action.payload.new_game_round);
            state.currentGameRound = action.payload.new_game_round;
            
        }
        );
        builder.addCase(endGameRoundAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }
        );

        builder.addCase(startGameRoundAction.pending, (state, action) => {
            state.loading = true;
        }
        );
        builder.addCase(startGameRoundAction.fulfilled, (state, action) => {
            state.loading = false;
            const index = state.allGameRounds.findIndex((gameRound) => gameRound.round_id === action.payload.game_round.round_id);
            if (index !== -1) {
                state.allGameRounds[index] = action.payload.game_round;
            }
            state.currentGameRound = action.payload.game_round;
        }
        );
        builder.addCase(startGameRoundAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }
        );
    }
});

export const { setCurrentGameRound,setCurrentRoundTime,setRoundPause ,setAllGameRounds} = gameRoundSlice.actions;

export default gameRoundSlice.reducer;
