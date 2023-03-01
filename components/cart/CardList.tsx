import { FC } from 'react'
import NextLink from 'next/link'
import { 
    Box, 
    Button,
    CardActionArea, 
    CardMedia, 
    Grid, 
    Link, 
    Typography, 
} from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'

import type { RootState } from '@/redux/store'
import { ItemCounter } from '../UI'
import { ICartProduct } from '@/interfaces'
import { updateCartQuantity, removeCardProduct } from '@/redux/slices'

interface Props {
    editable?: boolean
}

export const CardList: FC< Props > = ({ editable = false }) => {

    const dispatch = useDispatch()
    const { cart } = useSelector((state: RootState) => state.cart)

    const onNewCartQuantityValue = (product: ICartProduct, newQuantity: number) => {

        const productUpdated    = { ...product }
        productUpdated.quantity = newQuantity

        dispatch( updateCartQuantity( productUpdated ) )

    }

    return (
        <>
            {
                cart.map( product => (
                    <Grid container spacing={ 2 } sx={{ mb: 1 }} key={ product.slug + product.size }>
                        <Grid item xs={ 3 }>
                            <NextLink href={`/product/${ product.slug }`} passHref legacyBehavior >
                                <Link>
                                    <CardActionArea>
                                        <CardMedia 
                                            image={`/products/${ product.image }`}
                                            component='img'
                                            sx={{ borderRadius: '5px'}}
                                        />
                                    </CardActionArea>
                                </Link>
                            </NextLink>
                        </Grid>
                        <Grid item xs={ 7 }>
                            <Box display='flex' flexDirection='column'>
                                <Typography variant='body1'>{ product.title }</Typography>
                                <Typography variant='body1'>
                                    Talla: <strong>{ product.size }</strong>
                                </Typography>
                                {
                                    editable
                                        ? (
                                            <ItemCounter 
                                                currentValue={ product.quantity } 
                                                maxValue={ 10 } 
                                                updatedQuantity={(value) => onNewCartQuantityValue(product, value)} 
                                            />
                                        )
                                        : (
                                            <Typography variant='h5'>
                                                { product.quantity } producto{ product.quantity > 1 && 's'}
                                            </Typography>
                                        )
                                }
                            </Box>
                        </Grid>
                        <Grid item xs={ 2 } display='flex' alignItems='center' flexDirection='column'>
                            <Typography variant='subtitle1'>
                                {`s/. ${ product.price }`}
                            </Typography>

                            {
                                editable && (
                                    <Button 
                                        onClick={() => dispatch( removeCardProduct( product ) )}
                                        variant='text' 
                                        color='secondary'
                                    >
                                        Remover
                                    </Button>
                                )
                            }
                            
                        </Grid>
                    </Grid>
                ))
            }
        </>
    )
}
