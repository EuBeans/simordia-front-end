//user model
export interface User {
    user_id: string;
    email: string;
    registered_on: string;
    username: string;
}

export interface UserRegisterform {
    email: string;
    password: string;
    username: string;
}

export interface UserLoginform {
    email: string;
    password: string;
}

export interface UserLoginResponse {
    status: string;
    message: string;
    Authorization: string;
}

export interface UserRegisterResponse {
    status: string;
    message: string;
    Authorization: string;
}

export interface ValidateResponse {
    status: string;
    message: string;
}