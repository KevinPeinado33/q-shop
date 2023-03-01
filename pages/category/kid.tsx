import { Typography } from '@mui/material'

import { ShopLayout } from '@/components/layouts/ShopLayout'
import { ProductList } from '@/components/products'
import { FullScreenLoading } from '@/components/UI'
import { useProducts } from '@/hooks'

const KidPage = () => {

    const { products, isLoading } = useProducts('/products?gender=kid')

    return (
        <ShopLayout 
            title='Categoria niños'
            pageDescription='Categoria de ropa para niños'
        >
            <Typography variant='h1' component='h1' >Niños</Typography>
            <Typography variant='h2' sx={{ mb: 1 }} >Productos para los pequeños</Typography>

            {
                isLoading
                    ? <FullScreenLoading />
                    : <ProductList products={ products } />
            }

        </ShopLayout>
    )
}

export default KidPage
