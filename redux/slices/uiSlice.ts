import { createSlice } from '@reduxjs/toolkit'

export interface UiState {
    isOpenMenu: boolean
}

const initialState: UiState = {
    isOpenMenu: false
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleSideMenu: ( state ) => {
            state.isOpenMenu = !state.isOpenMenu
        }
    }
})

export const { toggleSideMenu } = uiSlice.actions

export default uiSlice.reducer
