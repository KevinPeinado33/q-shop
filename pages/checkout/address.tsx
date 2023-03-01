import { ShopLayout } from '@/components/layouts'
import { Typography, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Box, Button } from '@mui/material'

const AddressPage = () => {
  return (
    <ShopLayout title='Direccion' pageDescription='Confirmar direccion del destino' >
        <Typography variant='h1' component='h1'>Direccion</Typography>
        <Grid container spacing={ 2 } sx={{ mt: 2 }} >
            <Grid item xs={ 12 } sm={ 6 } >
                <TextField 
                    label='Nombre'
                    variant='outlined'
                    fullWidth
                />
            </Grid>
            <Grid item xs={ 12 } sm={ 6 } >
                <TextField 
                    label='Apellido'
                    variant='outlined'
                    fullWidth
                />
            </Grid>
            <Grid item xs={ 12 } sm={ 6 } >
                <TextField 
                    label='Direccion'
                    variant='outlined'
                    fullWidth
                />
            </Grid>
            <Grid item xs={ 12 } sm={ 6 } >
                <TextField 
                    label='Direccion 2 (opcional)'
                    variant='outlined'
                    fullWidth
                />
            </Grid>
            <Grid item xs={ 12 } sm={ 6 } >
                <TextField 
                    label='Ciudad'
                    variant='outlined'
                    fullWidth
                />
            </Grid>
            <Grid item xs={ 12 } sm={ 6 } >
                <TextField 
                    label='Codigo Postal'
                    variant='outlined'
                    fullWidth
                />
            </Grid>

            <Grid item xs={ 12 } sm={ 6 } >
                <FormControl fullWidth>
                    <InputLabel>Pais</InputLabel>
                    <Select
                        variant='outlined'
                        label='Pais'
                        value={ 1 }
                    >
                        <MenuItem value={ 1 } >Perusito</MenuItem>
                        <MenuItem value={ 2 } >Chilesito</MenuItem>
                        <MenuItem value={ 3 } >Arequipa</MenuItem>
                        <MenuItem value={ 4 } >Italia</MenuItem>
                        <MenuItem value={ 5 } >Alemania</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={ 12 } sm={ 6 } >
                <TextField 
                    label='Telefono'
                    variant='outlined'
                    fullWidth
                />
            </Grid>
        </Grid>

        <Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
            <Button color='secondary' className='circular-btn' size='large'>
                Revisar pedido
            </Button>
        </Box>
    </ShopLayout>
  )
}

export default AddressPage
