import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {loginUser,logoutUser,validateToken} from "../../services/authServices";
import {registerUser} from "../../services/userServices";

import {UserLoginform,UserRegisterform} from  "../../model/usersModel";
import { useEffect } from "react";

export interface AuthState {
    isAuthenticated: boolean;
    token: string;
    loading: boolean;
    error: string | null;
}


const initialState: AuthState = {
    isAuthenticated: false,
    token: "",
    loading: false,
    error: null,
};

export const registerUserAction = createAsyncThunk(
    "user/registerUser",
    async (user: UserRegisterform) => {
        const response = await registerUser(user);
        return response;
    }
);

export const loginUserAction = createAsyncThunk(
    "auth/login",
    async (user: UserLoginform) => {
        const response = await loginUser(user);
        return response;
    }
);

export const validateTokenAction = createAsyncThunk(
    "auth/validate",
    async () => {
        const response = await validateToken();
        return response;
    }
);
        

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.isAuthenticated = action.payload.isAuthenticated;
            state.token = action.payload.token;
            state.loading =  false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(registerUserAction.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(registerUserAction.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.token = action.payload.Authorization;
            localStorage.setItem("token", action.payload.Authorization);
        });
        builder.addCase(registerUserAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to register user";
        });
        builder.addCase(loginUserAction.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(loginUserAction.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.token = action.payload.Authorization;
            //store token in local storage
            localStorage.setItem("token", action.payload.Authorization);
        });
        builder.addCase(loginUserAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to login user";
        });

        builder.addCase(validateTokenAction.pending, (state) => {
            state.loading = true;
            state.error = null;
        }
        );
        builder.addCase(validateTokenAction.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.token = localStorage.getItem("token") || "";
        }
        );
        builder.addCase(validateTokenAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to validate token";
        }
        );

    },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
