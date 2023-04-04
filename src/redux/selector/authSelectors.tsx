import {createSelector} from 'reselect';
import {RootState} from '../app/store';

//check if user is logged in

// check if is local storage has token
export const getIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
