//user services pinging the api at the backend  https://simordia-backend.herokuapp.com
//

import axios from "axios";
import { Game, GameCreateInput,modelUpdateResponse,GameCreateResponse, GameListResponse} from "../model/gameModel";
import {url} from "./authServices";
const baseUrl = `${url}/game`;



export const createNewGame = async (game: GameCreateInput) : Promise<GameCreateResponse> => {
    const response = await axios.post(`${baseUrl}/`, game);
    return response.data;
}

export const updateModel = async () :Promise<modelUpdateResponse> => {
    const response = await axios.post(`${baseUrl}/update_model`);
    return response.data;
}

export const getGame = async (id: string) : Promise<Game> => {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
}

export const getAllGames = async () : Promise<GameListResponse> => {
    const response = await axios.get(`${baseUrl}/`);
    return response.data;
}




