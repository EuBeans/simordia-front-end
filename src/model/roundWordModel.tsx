import { AxiosError } from "axios";

export interface RoundWord {
    word_id: string;
    round_id: string;
    user_id: string;
    word: string;
    guess_number: number;
    is_correct: boolean;
    distance: number;
    created_at: string;
}

export interface RoundWordInput {
    word: string;
    round_id: string;
}

export interface RoundWordResponse {
    status: string;
    message: string;
    round_word?: RoundWord;
    error?: AxiosError 
}

export interface RoundWordListResponse {
    data: RoundWord[];
}