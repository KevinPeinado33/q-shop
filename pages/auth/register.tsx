import { useState } from 'react'
import NextLink from 'next/link'
import { useForm } from 'react-hook-form'
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material'
import { ErrorOutline } from '@mui/icons-material'

import { AuthLayout  } from '@/components/layouts'
import { validations } from '@/utils'
import { tesloApi } from '@/api'

type FormData = {
    name    : string
    email   : string
    password: string
}

const RegisterPage = () => {

    const [ showError, setShowError ] = useState(false)

    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm< FormData >()

    const onRegisterForm = async ( { email, password, name }: FormData ) => {
        setShowError( false )
        
        try {
            const { data } = await tesloApi.post('/user/register', { email, password, name })
            const { token, user } = data

            console.log({ token, user })

        } catch ( error ) {
            console.log('Error en las credenciales')
            setShowError( true )
            setTimeout(() => setShowError( false ), 9000)
        }
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
                                    label='No reconocemos ese usuario / constraseña'
                                    color='error'
                                    icon={ <ErrorOutline /> }
                                    className='fadeIn'
                                    sx={{ display: showError ? 'flex' : 'none' }}
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
                                <NextLink href='/auth/login' passHref legacyBehavior >
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