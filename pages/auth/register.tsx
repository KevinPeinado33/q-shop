import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material'
import { ErrorOutline } from '@mui/icons-material'

import { AuthLayout  } from '@/components/layouts'
import { validations } from '@/utils'
import { AppDispatch, RootState } from '@/redux'
import { loginRegister } from '@/services'
import { error } from '@/redux/slices/authSlice'

type FormData = {
    name    : string
    email   : string
    password: string
}

const RegisterPage = () => {

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

    const onRegisterForm = async ( { email, password, name }: FormData ) => {

        dispatch( loginRegister( email, password, name ) )

        if ( isError ) {
            setTimeout(() => {
                dispatch(error( false ))
            }, 9000)
            return
        }

        const destination = router.query.p?.toString() || '/'
        router.replace(destination)

    }

    return (
        <AuthLayout
            title='Registrar'>
                <form 
                    onSubmit={ handleSubmit( onRegisterForm ) }
                    noValidate
                >                
                    <Box sx={{ width: 350, padding: '10px 20px' }} >
                        <Grid container spacing={ 2 }>
                            <Grid item xs={ 12 } >
                                <Typography variant='h1' component='h1'>Crear Usuario</Typography>
                                <Chip 
                                    label='Hay un error en el registro'
                                    color='error'
                                    icon={ <ErrorOutline /> }
                                    className='fadeIn'
                                    sx={{ display: isError ? 'flex' : 'none' }}
                                />
                            </Grid>
                            <Grid item xs={ 12 } >
                                <TextField 
                                    { 
                                        ...register('name', {
                                            required: 'Este campo es requerido!',
                                            minLength: { value: 2, message: 'Minimo 2 caracteres' }
                                        }) 
                                    }
                                    error={ !!errors.name }
                                    helperText={ errors.name?.message }
                                    label='Nombre completo' 
                                    variant='outlined' 
                                    fullWidth 
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
                                    type='email'
                                    label='Correo' 
                                    variant='outlined' 
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
                                    type='submit'
                                    color='secondary' 
                                    className='circular-btn' 
                                    size='large'
                                    fullWidth 
                                >
                                    Ingresar
                                </Button>
                            </Grid>

                            <Grid item xs={ 12 } display='flex' justifyContent='end' >
                                <NextLink
                                    href={ router.query.p ? `/auth/login?p=${router.query.p}` : '/auth/login' }
                                    passHref 
                                    legacyBehavior 
                                >
                                    <Link underline='always'>
                                        Ya tienes cuenta?
                                    </Link>
                                </NextLink>
                            </Grid>
                        </Grid>
                    </Box>
                </form>
        </AuthLayout>
    )
}

export default RegisterPage
