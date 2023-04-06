//user services pinging the api at the backend  https://simordia-backend.herokuapp.com
//

import axios, { AxiosError } from "axios";
import {RoundWordInput,RoundWordListResponse,RoundWordResponse} from "../model/roundWordModel";
import {url} from "./authServices";

const baseUrl = `${url}/round_word`;

export const createNewRoundWord = async (roundWord: RoundWordInput) : Promise<RoundWordResponse> => {

    const response = await axios.post(`${baseUrl}/`, {...roundWord});
    return response.data;
}

export const getAllRoundWords = async (round_id: string) : Promise<RoundWordListResponse> => {
    const response = await axios.get(`${baseUrl}/${round_id}`);
    return response.data;
}





