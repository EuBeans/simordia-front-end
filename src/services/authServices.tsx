// auth services pinging the api at the backend  https://simordia-backend.herokuapp.com

import axios from "axios";
import { UserLoginform, UserLoginResponse, ValidateResponse } from "../model/usersModel";

const baseUrl = "https://simordia-backend.herokuapp.com/auth";

const token = localStorage.getItem('token');

axios.defaults.headers.common['Authorization'] = token;

export const loginUser = async (user: UserLoginform): Promise<UserLoginResponse>=> {
    const response = await axios.post(`${baseUrl}/login`, user);
    return response.data;
}

export const logoutUser = async () => {
    const response = await axios.post(`${baseUrl}/logout`);
    return response.data;
}

export const validateToken = async () : Promise<ValidateResponse> => {
    const response = await axios.post(`${baseUrl}/validate`);
    return response.data;
}

