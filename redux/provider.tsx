import { 
    FC, 
    ReactNode, 
    useEffect 
} from 'react'
import { 
    useDispatch, 
    useSelector 
} from 'react-redux'
import Cookie from 'js-cookie'

import { RootState } from './store'
import { getLoadCartFromCookie, updatedOrderSummary } from './slices/cartSlice'

const COOKIE_CART = 'cart'

interface Props { children: ReactNode }

const ProviderApp: FC< Props > = ({ children }) => {

    const dispatch = useDispatch()

    const { cart } = useSelector(( state: RootState ) => state.cart)

    useEffect(() => {

        try {

            const cookieProducts = Cookie.get( COOKIE_CART ) 
                                            ? JSON.parse( Cookie.get( COOKIE_CART )! ) 
                                            : [ ]
            dispatch( getLoadCartFromCookie( cookieProducts ) )

        } catch ( error ) {
            dispatch( getLoadCartFromCookie( [ ] ) )
        }
        
    }, [ ])

    useEffect(() => {

        if ( cart.length > 0 )  
            Cookie.set( COOKIE_CART, JSON.stringify( cart ) )
    
    }, [ cart ])

    useEffect(() => {

        const numberOfItems = cart.reduce( ( prev, current ) => current.quantity + prev, 0 )
        const subTotal      = cart.reduce( ( prev, current ) => ( current.price * current.quantity ) + prev, 0 )
        const taxRate       = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0)

        const orderSummary  = {
            numberOfItems,
            subTotal,
            tax: subTotal * taxRate,
            total: subTotal * ( taxRate + 1 )
        }

        dispatch(updatedOrderSummary( orderSummary ))

    }, [ cart ])

    return (
        <>
            { children }
        </>
    )
}

export default ProviderApp
