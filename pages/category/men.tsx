import { Typography } from '@mui/material'

import { ShopLayout } from '@/components/layouts/ShopLayout'
import { ProductList } from '@/components/products'
import { FullScreenLoading } from '@/components/UI'
import { useProducts } from '@/hooks'

const MenPage = () => {

    const { products, isLoading } = useProducts('/products?gender=men')

    return (
        <ShopLayout 
            title='Categoria varones'
            pageDescription='Categoria de ropa para varones'
        >
            <Typography variant='h1' component='h1' >Varones</Typography>
            <Typography variant='h2' sx={{ mb: 1 }} >Producto para los machomenos</Typography>

            {
                isLoading
                    ? <FullScreenLoading />
                    : <ProductList products={ products } />
            }

        </ShopLayout>
    )
}

export default MenPage
