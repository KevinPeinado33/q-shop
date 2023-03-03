import NextLink from 'next/link'
import { useSelector } from 'react-redux'
import { Box, Button, CardContent, Divider, Grid, Link, Typography } from '@mui/material'

import { CardList, OrderSummary } from '@/components/cart'
import { ShopLayout } from '@/components/layouts'
import { RootState } from '@/redux/store'
import { countries } from '@/utils'

const SummaryPage = () => {
    
    const { 
        shippingAddress,
        numberOfItems
    } = useSelector( (state: RootState) => state.cart )

    const {
        firstName,
        lastName,
        address,
        address2 = '',
        city,
        country,
        phone,
        zip
    } = shippingAddress!

    if ( !shippingAddress ) return <></>

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
                            <Typography variant='h2'>
                                Resumen ( { numberOfItems } producto{ numberOfItems > 1 && 's'} )
                            </Typography>
                            
                            <Divider sx={{ my: 1 }} /> 

                            <Box display='flex' justifyContent='space-between'>
                                <Typography variant='subtitle1'>Datos de entrega</Typography>
                                <NextLink href='/checkout/address' legacyBehavior passHref>
                                    <Link underline='always'>
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>

                            <Typography>{ `${ firstName } ${ lastName }` }</Typography>
                            <Typography>{ address } { address2 && `, ${ address2 }` }</Typography>
                            <Typography>{ city }, { zip }</Typography>
                            <Typography>{ countries.find( c => c.code === country )?.name }</Typography>
                            <Typography>{ phone }</Typography>
                            
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