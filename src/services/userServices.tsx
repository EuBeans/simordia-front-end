//user services pinging the api at the backend  https://simordia-backend.herokuapp.com
//

import axios from "axios";
import { Bool } from "reselect/es/types";
import { UserRegisterform, UserRegisterResponse } from "../model/usersModel";

const baseUrl = "https://simordia-backend.herokuapp.com/user/";



export const registerUser = async (user: UserRegisterform) : Promise<UserRegisterResponse> => {
    const response = await axios.post(`${baseUrl}`, user);
    return response.data;
}




