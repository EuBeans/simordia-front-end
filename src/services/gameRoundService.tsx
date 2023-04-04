//user services pinging the api at the backend  https://simordia-backend.herokuapp.com
//

import axios from "axios";
import {GameRound,GameRoundListResponse,GameRoundResponse,GameRoundInput,GameRoundStatus} from "../model/gameRoundModel";

const baseUrl = "https://simordia-backend.herokuapp.com/game_round";

export const createNewGameRound = async (gameRound: GameRoundInput) : Promise<GameRoundResponse> => {
    const response = await axios.post(`${baseUrl}/`, gameRound);
    return response.data;
}


export const getAllGameRounds = async (game_id: string) : Promise<GameRoundListResponse> => {
    const response = await axios.get(`${baseUrl}/${game_id}`);
    return response.data;
}



