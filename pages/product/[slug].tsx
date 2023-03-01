import { useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { Box, Button, Chip, Grid, Typography } from '@mui/material'

import { ShopLayout } from '@/components/layouts'
import { ProductSlideShow, SizeSelector } from '@/components/products'
import { ItemCounter } from '@/components/UI'
import { IProduct } from '@/interfaces/product'
import { dbProducts } from '@/database'
import { ICartProduct } from '@/interfaces/cart'
import { ISize } from '@/interfaces/product'
import { updatedProduct } from '@/redux/slices/cartSlice'

interface Props {
  product: IProduct
}

const ProductPage: NextPage< Props > = ({ product }) => {

  const router   = useRouter()
  const dispatch = useDispatch()

  const [ tempCartProduct, setTempCartProduct ] = useState< ICartProduct >({
    _id:      product._id,
    image:    product.images[ 0 ],
    price:    product.price,
    size:     undefined,
    slug:     product.slug,
    title:    product.title,
    gender:   product.gender,
    quantity: 1
  })

  const selectedSize = ( size: ISize ) => {
    setTempCartProduct( currentProduct => ({
      ...currentProduct,
      size
    }))
  }

  const onUpdatedQuantity = ( quantity: number ) => {
    setTempCartProduct( currentProduct => ({
      ...currentProduct,
      quantity
    }))
  }

  const onAddProduct = () => {
    if ( !tempCartProduct.size ) return
    dispatch( updatedProduct( tempCartProduct ) )
    router.push('/cart')
  }

  return (
    <ShopLayout
      title={ product.title }
      pageDescription={ product.description }
    >
      <Grid container spacing={ 3 }>
        <Grid item xs={ 12 } sm={ 7 } >
          <ProductSlideShow
            images={ product.images }
          />
        </Grid>

        <Grid item xs={ 12 } sm={ 5 }>
          <Box display='flex' flexDirection='column' >

            <Typography variant='h1' component='h1'>{ product.title }</Typography>
            <Typography variant='subtitle1' component='h2' >{ `s/.${product.price}` }</Typography>

            <Box sx={{ my: 2 }}>
              <Typography variant='subtitle2'>Cantidad</Typography>
              <ItemCounter 
                currentValue={ tempCartProduct.quantity } 
                updatedQuantity={ onUpdatedQuantity }                
                maxValue={ product.inStock > 10 ? 10 : product.inStock } 
              />
              <SizeSelector 
                selectedSize={ tempCartProduct.size }
                sizes={ product.sizes }
                onSelectedSize={ selectedSize }
              />
            </Box>

            {
              product.inStock > 0
                ? (
                  <Button 
                    onClick={ onAddProduct }
                    color='secondary' 
                    className='circular-btn' 
                  >
                    {
                      tempCartProduct.size
                        ? 'Agregar al carrito'
                        : 'Seleccione una talla'
                    }
                  </Button>
                )
                : (
                  <Chip label='No hay disponible' color='error' variant='outlined' />
                )
            }

            <Box sx={{ mt: 3 }}>
              <Typography variant='subtitle2'>Descripcion:</Typography>
              <Typography variant='body2'>{ product.description }</Typography>
            </Box>

          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const productSlugs = await dbProducts.getAllProductSlugs()

  return {
    paths: productSlugs.map(({ slug }) => ({
      params: {
        slug
      }
    })),
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

  const { slug = '' } = params as { slug: string }

  const product = await dbProducts.getProductBySlug( slug )

  if ( !product ) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24
  }
}

export default ProductPage
