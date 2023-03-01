import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { 
    AppBar, 
    Toolbar, 
    Link, 
    Typography, 
    Box,
    Button,
    IconButton,
    Badge,
    InputAdornment,
    Input
} from '@mui/material'
import { 
    ClearOutlined,
    SearchOutlined, 
    ShoppingCartOutlined 
} from '@mui/icons-material'

import { toggleSideMenu } from '@/redux/slices/uiSlice'
import { RootState } from '@/redux/store'

export const Navbar = () => {

    const { asPath, push } = useRouter()
    const dispatch         = useDispatch()

    const [ searchTerm, setSearchTerm ]           = useState('')
    const [ isSearchVisible, setIsSearchVisible ] = useState(false)
    
    const { numberOfItems } = useSelector( (state: RootState) => state.cart )

    const onSearchTerm = () => {
        if ( searchTerm.trim().length === 0 ) return
        push(`/search/${ searchTerm }`)
    }

    return (
        <AppBar >
            <Toolbar>
                <NextLink href='/' passHref legacyBehavior >
                    <Link underline='none' display='flex' alignContent='center' >
                        <Typography variant='h6' >Teslo |</Typography>
                        <Typography sx={{ ml: 0.5 }} >Shop</Typography>
                    </Link>
                </NextLink>

                <Box flex={ 1 } />

                <Box 
                    className='fadeIn'
                    sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm:'block' } }} >
                    <NextLink href='/category/men' passHref legacyBehavior >
                        <Link>
                            <Button 
                                color={ asPath === '/category/men' ? 'secondary' : 'primary' }
                            >
                                Hombre
                            </Button>
                        </Link>
                    </NextLink>
                    <NextLink href='/category/women' passHref legacyBehavior >
                        <Link>
                            <Button
                                color={ asPath === '/category/women' ? 'secondary' : 'primary' }
                            >
                                Mujeres
                            </Button>
                        </Link>
                    </NextLink>
                    <NextLink href='/category/kid' passHref legacyBehavior >
                        <Link>
                            <Button
                                color={ asPath === '/category/kid' ? 'secondary' : 'primary' }
                            >
                                Niños
                            </Button>
                        </Link>
                    </NextLink>
                </Box>

                <Box flex={ 1 } />
                
                {
                    isSearchVisible
                        ? (
                            <Input
                                className='fadeIn'
                                autoFocus
                                type='text'
                                placeholder='Buscar...'
                                value={ searchTerm }
                                onChange={ ( e ) => setSearchTerm( e.target.value ) }
                                onKeyPress={ (e) => e.key === 'Enter' ? onSearchTerm() : null }
                                endAdornment={
                                    <InputAdornment position='end'>
                                        <IconButton
                                            onClick={ () => setIsSearchVisible( false ) }
                                        >
                                            <ClearOutlined />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        )
                        : (
                            <IconButton
                                onClick={ () => setIsSearchVisible( true ) }
                                className='fadeIn'
                                sx={{ display:{ xs: 'none', sm: 'flex' } }}
                            >
                                <SearchOutlined />
                            </IconButton>
                        )
                }

                

                <IconButton
                    sx={{ display:{ xs: 'flex', sm: 'none' } }}
                    onClick={ () => dispatch(toggleSideMenu()) }
                >
                    <SearchOutlined />
                </IconButton>

                <NextLink href='/cart' passHref legacyBehavior >
                    <Link>
                        <IconButton>
                            {
                                numberOfItems >= 1
                                    ? (
                                        <Badge 
                                            className='fadeIn'
                                            badgeContent={ numberOfItems > 9 ? '+9' : numberOfItems } 
                                            color='secondary' 
                                        >
                                            <ShoppingCartOutlined />
                                        </Badge>
                                    ) : (
                                        <ShoppingCartOutlined />
                                    )
                            }
                        </IconButton>
                    </Link>
                </NextLink>

                <Button
                    onClick={ () => dispatch(toggleSideMenu()) }
                >
                    Menu
                </Button>

            </Toolbar>
        </AppBar>
    )
}
