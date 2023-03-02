import { tesloApi } from '@/api'
import Cookie from 'js-cookie'

import { AppDispatch } from '@/redux'
import { error, login } from '@/redux/slices/authSlice'

export const loginUser = ( 
    email   : string, 
    password: string 
) => async ( dispatch: AppDispatch ) => {

    try {
        
        const { data } = await tesloApi.post('/user/login', { email, password })

        const { token, user } = data

        Cookie.set('token', token)

        dispatch( login( user ) )

    } catch ( e ) {
        dispatch( error( true ) )
    }

}

export const loginRegister = ( 
    email   : string, 
    password: string,
    name    : string
) => async ( dispatch: AppDispatch ) => {

    try {
        
        const { data } = await tesloApi.post('/user/register', { email, password, name })

        const { token, user } = data

        Cookie.set('token', token)

        dispatch( login( user ) )
        dispatch( error( false ) )

    } catch ( e ) {
        dispatch( error( true ) )
    }

}

export const logoutUser = () => {
    Cookie.remove('token')
    Cookie.remove('cart')
}
