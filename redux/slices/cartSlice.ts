import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { ICartProduct } from '@/interfaces'

export interface CartState {
    isLoaded     : boolean
    cart         : ICartProduct[]
    numberOfItems: number
    subTotal     : number
    tax          : number
    total        : number
}

const initialState: CartState = {
    isLoaded     : false,
    cart         : [ ],
    numberOfItems: 0,
    subTotal     : 0,
    tax          : 0,
    total        : 0
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        getLoadCartFromCookie: ( state, { payload }: PayloadAction< ICartProduct[ ] > ) => {
            
            state.isLoaded = true
            state.cart = payload
        
        },

        updatedProduct: ( state, { payload }: PayloadAction< ICartProduct > ) => {
            
            const productInCart = state
                                    .cart
                                    .some( p => p._id === payload._id )
            
            if ( !productInCart ) {
                state.cart = [ ...state.cart, payload ]
                return
            }

            const productInCartButDifferentSize = state
                                                    .cart
                                                    .some( p => p._id === payload._id && p.size === payload.size )
            if ( !productInCartButDifferentSize ) {
                state.cart = [ ...state.cart, payload ]
                return
            }

            const updatedProducts = state.cart.map( p => {

                if ( p._id !== payload._id )   return p
                if ( p.size !== payload.size ) return p
                
                p.quantity += payload.quantity
                return p

            })
            
            state.cart = [ ...updatedProducts ]

        },

        updateCartQuantity: ( state, { payload }: PayloadAction< ICartProduct > ) => {
            state.cart = state.cart.map( product => {

                if ( product._id !== payload._id )   return product
                if ( product.size !== payload.size ) return product

                return payload

            })
        },

        removeCardProduct: (state, { payload }: PayloadAction< ICartProduct > ) => {
            state.cart = state.cart.filter( product => !( product._id === payload._id && product.size === payload.size ))
        },

        updatedOrderSummary: (
            state, 
            { payload }: PayloadAction<{
                numberOfItems: number
                subTotal:      number
                tax:           number
                total:         number
            }>
        ) => {
            state.numberOfItems = payload.numberOfItems
            state.subTotal      = payload.subTotal
            state.tax           = payload.tax
            state.total         = payload.total
        }
        
    }
})

export const { 
    getLoadCartFromCookie, 
    updatedOrderSummary,
    updateCartQuantity,
    removeCardProduct,
    updatedProduct,
} = cartSlice.actions

export default cartSlice.reducer
