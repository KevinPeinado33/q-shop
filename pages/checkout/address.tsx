import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { 
    Box, 
    Button,
    FormControl, 
    Grid, 
    InputLabel, 
    MenuItem, 
    TextField, 
    Typography, 
} from '@mui/material'

import { ShopLayout } from '@/components/layouts'
import { countries } from '@/utils/countries'
import { updatedAddressCart } from '@/services'
import { AppDispatch } from '@/redux/store'

type FormData = {
    firstName: string
    lastName : string
    address  : string
    address2 : string
    zip      : string
    city     : string
    country  : string
    phone    : string
}

const getAddressFromCookies = (): FormData => {
    return {
        firstName: Cookies.get('firstName') || '',
        lastName : Cookies.get('lastName')  || '',
        address  : Cookies.get('address')   || '',
        address2 : Cookies.get('address2')  || '',
        zip      : Cookies.get('zip')       || '',
        city     : Cookies.get('city')      || '',
        country  : Cookies.get('country')   || '',
        phone    : Cookies.get('phone')     || ''
    }
}

const AddressPage = () => {

    const router                = useRouter()
    const dispatch: AppDispatch = useDispatch()

    const { register, handleSubmit, formState: { errors } } = useForm< FormData >({
        defaultValues: getAddressFromCookies()
    })

    const onSubmitAddress = ( data: FormData ) => {
        dispatch( updatedAddressCart( data ) )
        router.push('/checkout/summary')
    }

    return (
        <ShopLayout title='Direccion' pageDescription='Confirmar direccion del destino' >
            <form 
                noValidate 
                onSubmit={ handleSubmit( onSubmitAddress ) } 
            >
                <Typography variant='h1' component='h1'>Dirección</Typography>
                <Grid container spacing={ 2 } sx={{ mt: 2 }} >
                    <Grid item xs={ 12 } sm={ 6 } >
                        <TextField 
                            { 
                                ...register('firstName', {
                                    required: 'Este campo es requerido!',
                                    minLength: { value: 6, message: 'Minimo 6 caracteres' } 
                                })
                            }
                            error={ !!errors.firstName }
                            helperText={ errors.firstName?.message }
                            label='Nombre'
                            variant='outlined'
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={ 12 } sm={ 6 } >
                        <TextField 
                            { 
                                ...register('lastName', {
                                    required: 'Este campo es requerido!',
                                    minLength: { value: 6, message: 'Minimo 6 caracteres' } 
                                })
                            }
                            error={ !!errors.lastName }
                            helperText={ errors.lastName?.message }
                            label='Apellido'
                            variant='outlined'
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={ 12 } sm={ 6 } >
                        <TextField 
                            { 
                                ...register('address', {
                                    required: 'Este campo es requerido!'
                                })
                            }
                            error={ !!errors.address }
                            helperText={ errors.address?.message }
                            label='Direccion'
                            variant='outlined'
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={ 12 } sm={ 6 } >
                        <TextField 
                            { 
                                ...register('address2')
                            }
                            label='Direccion 2 (opcional)'
                            variant='outlined'
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={ 12 } sm={ 6 } >
                        <TextField 
                            { 
                                ...register('zip', {
                                    required: 'Este campo es requerido!'
                                })
                            }
                            error={ !!errors.zip }
                            helperText={ errors.zip?.message }
                            label='Codigo Postal'
                            variant='outlined'
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={ 12 } sm={ 6 } >
                        <TextField 
                            { 
                                ...register('city', {
                                    required: 'Este campo es requerido!'
                                })
                            }
                            error={ !!errors.city }
                            helperText={ errors.city?.message }
                            label='Ciudad'
                            variant='outlined'
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={ 12 } sm={ 6 } >
                        <FormControl fullWidth>
                            <InputLabel>Pais</InputLabel>
                            <TextField
                                { 
                                    ...register('country', {
                                        required: 'Este campo es requerido!'
                                    })
                                }
                                error={ !!errors.country }
                                variant='outlined'
                                label='Pais'
                                defaultValue={ countries[0].code }
                                select
                            >
                                {
                                    countries.map( country => (
                                        <MenuItem 
                                            key={ country.code }
                                            value={ country.code } 
                                        >
                                            { country.name }
                                        </MenuItem>
                                    ))
                                }
                            </TextField>
                        </FormControl>
                    </Grid>
                    <Grid item xs={ 12 } sm={ 6 } >
                        <TextField 
                            { 
                                ...register('phone', {
                                    required: 'Este campo es requerido!',
                                    minLength: { value: 6, message: 'Minimo 9 caracteres' } 
                                })
                            }
                            error={ !!errors.phone }
                            helperText={ errors.phone?.message }
                            label='Telefono'
                            variant='outlined'
                            fullWidth
                        />
                    </Grid>
                </Grid>

                <Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
                    <Button 
                        type='submit'
                        color='secondary' 
                        className='circular-btn' 
                        size='large'
                    >
                        Revisar pedido
                    </Button>
                </Box>
            </form>
        </ShopLayout>
    )
}

export default AddressPage
