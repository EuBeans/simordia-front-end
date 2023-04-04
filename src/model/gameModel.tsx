export enum GameMode {
    TIMED = "timed",
    MULTIPLAYER = "multiplayer",
}

export enum GameLevel {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard",
}

export enum GameTheme {
    sports = "sports",
    animals = "animals",
    fruits = "fruits",
    vegetables = "vegetables",
    food = "food",
    clothes = "clothes",
    colors = "colors",
    body = "body",
    family = "family",
    jobs = "jobs",
    transport = "transport",
    weather = "weather",
    house = "house",
    furniture = "furniture",
    kitchen = "kitchen",
    school = "school",
    office = "office",
    holidays = "holidays",
    countries = "countries",
    cities = "cities",
    science = "science",
    history = "history",
}

export enum GameStatus {
    in_progress = "in_progress",
    completed = "completed"
}

export interface GameCreateInput {
    game_mode: GameMode;
    game_level: GameLevel;
    theme: GameTheme;
    max_round_number: number;
}

export interface GameListResponse{
    data: Game[];
}

export interface modelUpdateResponse {
    status: string;
    message: string;
}
export interface GameCreateResponse {
    status: string;
    message: string;
    game: Game;
}
export interface Game {
    user_id: string;
    game_id: string;
    score: number;
    start_time: string;
    end_time: string;
    created_at: string;
    game_status: GameStatus;
    game_mode: GameMode ;
    game_level: GameLevel;
    theme: GameTheme;
    max_round_number: number;
    multiplayer_code: string;
}