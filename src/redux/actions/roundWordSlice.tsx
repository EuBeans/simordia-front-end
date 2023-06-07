import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {createNewRoundWord,getAllRoundWords} from "../../services/roundWordService";
import {RoundWord,RoundWordInput,RoundWordListResponse,RoundWordResponse} from "../../model/roundWordModel";
import {getAllGameRoundsAction} from "./gameRoundSlice";
import { useEffect } from "react";

export interface RoundWordState {
    allRoundWords: RoundWord[];
    currentRoundWord: RoundWord | undefined;
    loading: boolean;
    error: string | undefined;
}

const initialState: RoundWordState = {
    allRoundWords: [],
    currentRoundWord: undefined,
    loading: false,
    error: undefined,
}

export const createRoundWord = createAsyncThunk(
    'roundWord/createRoundWord',
    async (roundWord: RoundWordInput) => {
        const response = await createNewRoundWord(roundWord);
        return response;
    }
)

export const fetchAllRoundWords = createAsyncThunk(
    'roundWord/fetchAllRoundWords',
    async (round_id: string) => {
        const response = await getAllRoundWords(round_id);
        return response.data;
    }
)


export const roundWordSlice = createSlice({
    name: 'roundWord',
    initialState,
    reducers: {
        setCurrentRoundWord: (state, action) => {
            state.currentRoundWord = action.payload;
        },
        setAllRoundWords: (state, action) => {
            state.allRoundWords = action.payload;
        },
        resetRoundWordState: (state) => {
            state.allRoundWords = [];
            state.currentRoundWord = undefined;
            state.loading = false;
            state.error = undefined;
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(createRoundWord.pending, (state) => {
                state.loading = true;
            })
            .addCase(createRoundWord.fulfilled, (state, action) => {
                state.loading = false;
                if(action.payload.status === 'success'){
                    state.currentRoundWord = action.payload.round_word;
                    state.error = undefined;
                    //append to allRoundWords
                    action.payload.round_word && state.allRoundWords.push(action.payload.round_word);
                }else{
                    state.error = action.payload.message;
                }
            })
            .addCase(createRoundWord.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchAllRoundWords.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllRoundWords.fulfilled, (state, action) => {
                state.loading = false;
                state.allRoundWords = action.payload;
            })
            .addCase(fetchAllRoundWords.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
})

export const {setCurrentRoundWord,setAllRoundWords, resetRoundWordState} = roundWordSlice.actions;

export default roundWordSlice.reducer;

