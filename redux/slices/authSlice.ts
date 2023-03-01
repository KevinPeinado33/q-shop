import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IUser } from '@/interfaces'

export interface AuthState {
    isLoggedIn: boolean,
    user?     : IUser
}

const initialState: AuthState = {
    isLoggedIn: false,
    user      : undefined
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        login: ( state, { payload }: PayloadAction< IUser > ) => { 

            state.isLoggedIn = true
            state.user       = payload

        },

        logout: ( state ) => {

            state.isLoggedIn = false
            state.user       = undefined
            
        }

    }
})

export const { 
    login,
    logout
} = authSlice.actions

export default authSlice.reducer

