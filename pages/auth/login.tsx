import NextLink from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material'
import { ErrorOutline } from '@mui/icons-material'

import { loginUser } from '@/services'
import { AuthLayout } from '@/components/layouts'
import { validations } from '@/utils'
import { RootState } from '@/redux'
import { AppDispatch } from '@/redux/store'
import { error } from '@/redux/slices/authSlice'

type FormData = {
    email   : string
    password: string
}

const LoginPage = () => {

    const router                = useRouter()
    const dispatch: AppDispatch = useDispatch()

    const { 
        isError 
    } = useSelector( (state: RootState) => state.auth )

    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm< FormData >()

    const onLoginUser = async ( { email, password }: FormData ) => {

        dispatch( loginUser( email, password ) )

        console.log({ isError })

        if ( !isError ) {
            setTimeout(() => {
                dispatch(error( false ))
            }, 9000)
            return
        }

        console.log('entroo aquiii')

        router.replace('/')
        
    }

    return (
        <AuthLayout
            title='Ingresar'>
                <form 
                    noValidate
                    onSubmit={ handleSubmit( onLoginUser ) } >
                    <Box sx={{ width: 350, padding: '10px 20px' }} >
                        <Grid container spacing={ 2 }>
                            <Grid item xs={ 12 } >
                                <Typography variant='h1' component='h1'>Iniciar Sesion</Typography>
                                <Chip 
                                    label='No reconocemos ese usuario / constraseña'
                                    color='error'
                                    icon={ <ErrorOutline /> }
                                    className='fadeIn'
                                    sx={{ display: isError ? 'flex' : 'none' }}
                                />
                            </Grid>
                            <Grid item xs={ 12 } >
                                <TextField 
                                    { 
                                        ...register('email', {
                                            required: 'Este campo es requerido!',
                                            validate: validations.isEmail
                                        })
                                    }
                                    error={ !!errors.email }
                                    helperText={ errors.email?.message }
                                    label='Correo' 
                                    variant='outlined'
                                    type='email'
                                    fullWidth 
                                />
                            </Grid>
                            <Grid item xs={ 12 } >
                                <TextField 
                                    { 
                                        ...register('password', {
                                            required: 'Este campo es requerido!',
                                            minLength: { value: 6, message: 'Minimo 6 caracteres' }
                                        }) 
                                    }
                                    error={ !!errors.password }
                                    helperText={ errors.password?.message }
                                    label='Password' 
                                    type='password' 
                                    variant='outlined' 
                                    fullWidth 
                                />
                            </Grid>
                            <Grid item xs={ 12 } >
                                <Button 
                                    color='secondary' 
                                    className='circular-btn' 
                                    size='large'
                                    fullWidth
                                    type='submit' 
                                >
                                    Ingresar
                                </Button>
                            </Grid>

                            <Grid item xs={ 12 } display='flex' justifyContent='end' >
                                <NextLink href='/auth/register' passHref legacyBehavior >
                                    <Link underline='always'>
                                        No tienes cuenta?
                                    </Link>
                                </NextLink>
                            </Grid>
                        </Grid>
                    </Box>
                </form>
        </AuthLayout>
    )
}

export default LoginPage
