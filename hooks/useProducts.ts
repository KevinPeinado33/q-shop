import useSWR, { SWRConfiguration } from 'swr'

import { IProduct } from '@/interfaces'

export const useProducts = ( url: string, config: SWRConfiguration = { } ) => {
    
    const { 
        data, 
        error, 
        isLoading 
    } = useSWR< IProduct[ ] >( `/api${ url }`, config )

    return {
        products: data || [],
        error,
        isLoading
    }

}
