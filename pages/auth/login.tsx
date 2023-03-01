import NextLink from 'next/link'
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'

import { AuthLayout } from '@/components/layouts'
import { validations } from '@/utils'

type FormData = {
    email   : string
    password: string
}

const LoginPage = () => {

    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm< FormData >()

    const onLoginUser = ( data: FormData ) => {
        console.log({ data })
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