import { Grid, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { currency } from '@/utils'

export const OrderSummary = () => {

    const { 
        numberOfItems, 
        subTotal, 
        tax, 
        total 
    } = useSelector( (state: RootState) => state.cart )

    return (
        <Grid container>
            <Grid item xs={ 6 }>
                <Typography>No. Productos</Typography>
            </Grid>
            <Grid item xs={ 6 } display='flex' justifyContent='end'>
                <Typography>{ numberOfItems } item{ numberOfItems > 1 && 's' }</Typography>
            </Grid>
            
            <Grid item xs={ 6 }>
                <Typography>SubTotal</Typography>
            </Grid>
            <Grid item xs={ 6 } display='flex' justifyContent='end'>
                <Typography>{ currency.format( subTotal ) }</Typography>
            </Grid>
        
            <Grid item xs={ 6 }>
                <Typography>Impuestos ({ Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100 }%)</Typography>
            </Grid>
            <Grid item xs={ 6 } display='flex' justifyContent='end'>
                <Typography>{ currency.format( tax ) }</Typography>
            </Grid>
            
            <Grid item xs={ 6 } sx={{ mt: 2 }}>
                <Typography variant='subtitle1'>Total</Typography>
            </Grid>
            <Grid item xs={ 6 } sx={{ mt: 2 }} display='flex' justifyContent='end'>
                <Typography variant='subtitle1'>{ currency.format( total ) }</Typography>
            </Grid>
        </Grid>
    )
}
