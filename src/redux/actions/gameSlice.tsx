import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {createNewGame,getGame,getAllGames} from "../../services/gameService";
import { GameCreateInput, Game,GameLevel,GameMode,GameTheme, modelUpdateResponse, GameStatus} from "../../model/gameModel";
import {createNewGameRound} from "../../services/gameRoundService";
import { useEffect } from "react";


export interface GameState {
    allGames: Game[];
    currentGame: Game | undefined;
    
    loading: boolean;
    error: string | undefined;
}

const initialState: GameState = {
    allGames: [],
    currentGame: undefined,
    loading: false,
    error: undefined,
};

export const createGameAction = createAsyncThunk(
    "game/createGame",
    async (game: GameCreateInput) => {
        const response = await createNewGame(game);
        return response;
    }
);


export const getGameAction = createAsyncThunk(
    "game/getGame",
    async (id: string) => {
        const response = await getGame(id);
        return response;
    }
);

export const getAllGamesAction = createAsyncThunk(
    "game/getAllGames",
    async () => {
        const response = await getAllGames();
        return response;
    }
);

export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        setCurrentGame: (state, action) => {
            state.currentGame = action.payload;
        },
        setAllGames: (state, action) => {
            state.allGames = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createGameAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createGameAction.fulfilled, (state, action) => {
            state.loading = false;
            state.currentGame = action.payload.game;
            createNewGameRound({
                game_id: action.payload.game.game_id
            })
        });
        builder.addCase(createGameAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(getGameAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getGameAction.fulfilled, (state, action) => {
            state.loading = false;
            state.currentGame = action.payload;
        });
        builder.addCase(getGameAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(getAllGamesAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllGamesAction.fulfilled, (state, action) => {
            state.loading = false;
            state.allGames = action.payload.data;
        });
        builder.addCase(getAllGamesAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
});

export const { setCurrentGame, setAllGames } = gameSlice.actions;

export default gameSlice.reducer;