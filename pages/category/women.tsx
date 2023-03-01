import { Typography } from '@mui/material'

import { ShopLayout } from '@/components/layouts/ShopLayout'
import { ProductList } from '@/components/products'
import { FullScreenLoading } from '@/components/UI'
import { useProducts } from '@/hooks'

const WomenPage = () => {

    const { products, isLoading } = useProducts('/products?gender=woman')

    return (
        <ShopLayout 
            title='Categoria mujeres'
            pageDescription='Categoria de ropa para mujeres'
        >
            <Typography variant='h1' component='h1' >Mujeres</Typography>
            <Typography variant='h2' sx={{ mb: 1 }} >Producto para las frias de corazón</Typography>

            {
                isLoading
                    ? <FullScreenLoading />
                    : <ProductList products={ products } />
            }

        </ShopLayout>
    )
}

export default WomenPage
