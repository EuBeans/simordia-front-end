//user services pinging the api at the backend  https://simordia-backend.herokuapp.com
//

import axios from "axios";
import {GameRound,GameRoundListResponse,GameRoundResponse,GameRoundInput, EndGameRoundResponse, EndGameRoundInput} from "../model/gameRoundModel";
import {url} from "./authServices";
const baseUrl = `${url}/game_round`;

export const createNewGameRound = async (gameRound: GameRoundInput) : Promise<GameRoundResponse> => {
    const response = await axios.post(`${baseUrl}/`, gameRound);
    return response.data;
}


export const getAllGameRounds = async (game_id: string) : Promise<GameRoundListResponse> => {
    const response = await axios.get(`${baseUrl}/${game_id}`);
    return response.data;
}


export const endGameRound = async (endGameRoundInput: EndGameRoundInput) : Promise<EndGameRoundResponse> => {
    const response = await axios.patch(`${baseUrl}/`, {...endGameRoundInput});
    return response.data;
}

