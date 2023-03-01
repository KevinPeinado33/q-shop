import NextLink from 'next/link'
import { Box, CardContent, Chip, Divider, Grid, Link, Typography } from '@mui/material'

import { CardList, OrderSummary } from '@/components/cart'
import { ShopLayout } from '@/components/layouts'
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material'

const OrderPage = () => {
  return (
    <ShopLayout
        title='Resumen la orden ...12'
        pageDescription='Resumen de la orden'
    >
        <Typography variant='h1' component='h1' >Orden: ABC123</Typography>

        {/* <Chip
            sx={{ my: 2 }}
            label='Pendiente de pago'
            variant='outlined'
            color='error'
            icon={ <CreditCardOffOutlined />}
        /> */}
        <Chip
            sx={{ my: 2 }}
            label='Orden ya pagada!'
            variant='outlined'
            color='success'
            icon={ <CreditScoreOutlined />}
        />

        <Grid container>
            <Grid item xs={ 12 } sm={ 7 } >
                <CardList />
            </Grid>
            <Grid item xs={ 12 } sm={ 5 }>
                <Grid className='summary-card' >
                    <CardContent>
                        <Typography variant='h2'>Resumen (3 productos)</Typography>
                        
                        <Divider sx={{ my: 1 }} /> 

                        <Box display='flex' justifyContent='space-between'>
                            <Typography variant='subtitle1'>Direccion de entrega</Typography>
                            <NextLink href='/checkout/address' legacyBehavior passHref>
                                <Link underline='always'>
                                    Editar
                                </Link>
                            </NextLink>
                        </Box>

                        <Typography>Kevin Peinado</Typography>
                        <Typography>Kevin Peinado</Typography>
                        <Typography>Kevin Peinado</Typography>
                        <Typography>Kevin Peinado</Typography>

                        <Divider sx={{ my: 1 }} /> 

                        <Box display='flex' justifyContent='end'>
                            <NextLink href='/cart' legacyBehavior passHref>
                                <Link underline='always'>
                                    Editar
                                </Link>
                            </NextLink>
                        </Box>

                        <OrderSummary />

                        <Box sx={{ mt: 3 }} >
                            <h1>Pagar</h1>
                            <Chip
                                sx={{ my: 2 }}
                                label='Orden ya pagada!'
                                variant='outlined'
                                color='success'
                                icon={ <CreditScoreOutlined />}
                            />
                        </Box>

                    </CardContent>
                </Grid>
            </Grid>
        </Grid>
    </ShopLayout>
  )
}

export default OrderPage