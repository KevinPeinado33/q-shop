import { Box, Button, CardContent, Divider, Grid, Typography } from '@mui/material'
import { CardList, OrderSummary } from '@/components/cart'
import { ShopLayout } from '@/components/layouts'
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store'

const CartPage = () => {

    const { numberOfItems } = useSelector((state: RootState) => state.cart)

    return (
        <ShopLayout
            title={ `Carrito ${ numberOfItems > 9 ? '+9' : numberOfItems } ${ numberOfItems > 1 ? 'items' : 'item' }` }
            pageDescription='Carrito de compras de la tienda teslo'
        >
            <Typography variant='h1' component='h1' >Carrito</Typography>
            <Grid container>
                <Grid item xs={ 12 } sm={ 7 } >
                    <CardList editable />
                </Grid>
                <Grid item xs={ 12 } sm={ 5 }>
                    <Grid className='summary-card' >
                        <CardContent>
                            <Typography variant='h2'>Orden</Typography>
                            <Divider sx={{ my: 1 }} /> 

                            <OrderSummary />

                            <Box sx={{ mt: 3 }} >
                                <Button color='secondary' className='circular-btn' fullWidth>
                                    Checkout
                                </Button>
                            </Box>

                        </CardContent>
                    </Grid>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

export default CartPage