import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IUser } from '@/interfaces'

export interface AuthState {
    isLoggedIn: boolean,
    user?     : IUser,
    isError?  : boolean
}

const initialState: AuthState = {
    isLoggedIn: false,
    user      : undefined,
    isError   : false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        error: ( state, { payload }: PayloadAction< boolean > ) => {
            state.isError = payload
        },

        login: ( state, { payload }: PayloadAction< IUser > ) => { 

            state.isLoggedIn = true
            state.isError    = false
            state.user       = payload

        },

        logout: ( state ) => {

            state.isLoggedIn = false
            state.user       = undefined
            state.isError    = false
            
        }

    }
})

export const {
    error,
    login,
    logout,    
} = authSlice.actions

export default authSlice.reducer

