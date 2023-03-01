import { Typography } from '@mui/material'

import { ShopLayout } from '@/components/layouts'
import { ProductList } from '@/components/products'
import { useProducts } from '@/hooks'
import { FullScreenLoading } from '@/components/UI'

const Home = () => {

  const { products, isLoading } = useProducts('/products')

  return (
    <ShopLayout 
      title='TesloShop - HOME'
      pageDescription='Encuentra los mejores productos de teslo aqui'
    >
      <Typography variant='h1' component='h1' >Tienda</Typography>
      <Typography variant='h2' sx={{ mb: 1 }} >Todos los productos</Typography>

      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList products={ products } />
      }
    
    </ShopLayout>
  )
}

export default Home
