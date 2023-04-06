import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {createNewGame,getGame,getAllGames} from "../../services/gameService";
import { GameCreateInput, Game,GameLevel,GameMode,GameTheme, modelUpdateResponse, GameStatus} from "../../model/gameModel";
import {createNewGameRound} from "../../services/gameRoundService";
import { useEffect } from "react";


export interface GameState {
    allGames: Game[];
    currentGame: Game | undefined;
    isGameDone: boolean | undefined;
    gameRoundTime: number|undefined;
    currentScore: number;
    loading: boolean;
    error: string | undefined;
}

const initialState: GameState = {
    allGames: [],
    isGameDone: undefined,
    currentGame: undefined,
    gameRoundTime: 15,
    currentScore: 0,
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

export const getCurrentGameScoreAction = createAsyncThunk(
    "game/getCurrentGameScore",
    async (game_id: string) => {
        const response = await getGame(game_id);
        return response.score;
    }
);

export const getIsGameDoneAction = createAsyncThunk(
    "game/getIsGameDone",
    async (game_id: string) => {
        const response = await getGame(game_id);
        return response.game_status === GameStatus.completed;
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
        setCurrentGameScore: (state, action) => {
            state.currentScore = action.payload;
        },
        setCurrentGameRoundTime: (state, action) => {
            state.gameRoundTime = action.payload;
        },
        setIsGameDone: (state, action) => {
            state.isGameDone = action.payload;
        }

    },
    extraReducers: (builder) => {
        builder.addCase(createGameAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createGameAction.fulfilled, (state, action) => {
            state.loading = false;
            state.currentGame = action.payload.game;
            state.isGameDone = false;
            createNewGameRound({
                game_id: action.payload.game.game_id
            })

            state.allGames.push(action.payload.game);
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
        builder.addCase(getCurrentGameScoreAction.pending, (state) => {
            state.loading = true;
        }
        );
        builder.addCase(getCurrentGameScoreAction.fulfilled, (state, action) => {
            state.loading = false;
            state.currentScore = action.payload;
        }
        );
        builder.addCase(getCurrentGameScoreAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }
        );
        builder.addCase(getIsGameDoneAction.pending, (state) => {
            state.loading = true;
        }
        );
        builder.addCase(getIsGameDoneAction.fulfilled, (state, action) => {
            state.loading = false;
            state.isGameDone = action.payload;
        }
        );
        builder.addCase(getIsGameDoneAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }
        );
    }
});

export const { setCurrentGame, setAllGames, setCurrentGameRoundTime, setCurrentGameScore,setIsGameDone } = gameSlice.actions;

export default gameSlice.reducer;