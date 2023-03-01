import NextLink from 'next/link'
import { Box, Button, CardContent, Divider, Grid, Link, Typography } from '@mui/material'

import { CardList, OrderSummary } from '@/components/cart'
import { ShopLayout } from '@/components/layouts'

const SummaryPage = () => {
  return (
    <ShopLayout
        title='Resumen de orden'
        pageDescription='Resumen de la orden'
    >
        <Typography variant='h1' component='h1' >Resumen de la orden</Typography>
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
                            <Button color='secondary' className='circular-btn' fullWidth>
                                Confirmar orden
                            </Button>
                        </Box>

                    </CardContent>
                </Grid>
            </Grid>
        </Grid>
    </ShopLayout>
  )
}

export default SummaryPage