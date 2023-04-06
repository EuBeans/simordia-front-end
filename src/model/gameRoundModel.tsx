
export interface GameRoundInput {
    game_id: string;
}

export interface GameRoundResponse{
    status: string;
    message: string;
    game_round: GameRound;
}

export interface GameRoundListResponse{
    data: GameRound[];
}

export interface GameRound {
    round_id: string;
    game_id: string;
    round_number: number;
    round_word: string;
    start_time: string;
    end_time: string;
    status: GameRoundStatus;
    number_of_guesses: number;
    round_score: number;
}

export enum GameRoundStatus {
    in_progress = "in_progress",
    completed = "completed",
    timed_out = "timed_out",
    skipped = "skipped"
}

export interface EndGameRoundInput {
    game_round_id : string,
    status: GameRoundStatus
}

export interface EndGameRoundResponse{
    status: string;
    message: string;
    prev_game_round: GameRound;
    new_game_round?: GameRound;
}

