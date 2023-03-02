import { useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { 
    Box, 
    Divider, 
    Drawer, 
    IconButton, 
    Input, 
    InputAdornment, 
    List, 
    ListItem, 
    ListItemIcon, 
    ListItemText, 
    ListSubheader 
} from '@mui/material'
import { 
    AccountCircleOutlined, 
    AdminPanelSettings, 
    CategoryOutlined, 
    ConfirmationNumberOutlined, 
    EscalatorWarningOutlined, 
    FemaleOutlined, 
    LoginOutlined, 
    MaleOutlined, 
    SearchOutlined, 
    VpnKeyOutlined 
} from '@mui/icons-material'

import type { RootState } from '@/redux'
import { toggleSideMenu } from '@/redux/slices/uiSlice'
import { logoutUser } from '@/services'

export const SideMenu = () => {

    const dispatch       = useDispatch()
    const router         = useRouter()
    const { isOpenMenu } = useSelector(( state: RootState ) => state.ui)
    const { user, isLoggedIn } = useSelector(( state: RootState ) => state.auth)

    const [ searchTerm, setSearchTerm ] = useState('')

    const onSearchTerm = () => {
        if ( searchTerm.trim().length === 0 ) return
        navigateTo(`/search/${ searchTerm }`)
    }

    const navigateTo = ( url: string ) => {
        router.push( url )
        dispatch( toggleSideMenu() )
    }

    const onLogout = () => {
        logoutUser()
        router.reload()
    }

    return (
        <Drawer
            open={ isOpenMenu }
            onClose={ () => dispatch(toggleSideMenu()) }
            anchor='right'
            sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
        >
            <Box sx={{ width: 250, paddingTop: 5 }}>
                <List>
                    <ListItem>
                        <Input
                            autoFocus
                            type='text'
                            placeholder='Buscar...'
                            value={ searchTerm }
                            onChange={ ( e ) => setSearchTerm( e.target.value ) }
                            onKeyPress={ (e) => e.key === 'Enter' ? onSearchTerm() : null }
                            endAdornment={
                                <InputAdornment position='end'>
                                    <IconButton
                                        aria-label='toggle password visibility'
                                    >
                                        <SearchOutlined />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </ListItem>

                    {
                        isLoggedIn && (
                            <>
                                <ListItem button>
                                    <ListItemIcon>
                                        <AccountCircleOutlined />
                                    </ListItemIcon>
                                    <ListItemText primary={'Perfil'} />
                                </ListItem>

                                <ListItem button>
                                    <ListItemIcon>
                                        <ConfirmationNumberOutlined />
                                    </ListItemIcon>
                                    <ListItemText primary={'Mis Ordenes'} />
                                </ListItem>
                            </>
                        )
                    }

                    <ListItem 
                        button 
                        onClick={ () => navigateTo('/category/men') }
                        sx={{ display: { xs: '', sm: 'none' } }}>
                        <ListItemIcon>
                            <MaleOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Hombres'} />
                    </ListItem>

                    <ListItem 
                        button 
                        onClick={ () => navigateTo('/category/women') }
                        sx={{ display: { xs: '', sm: 'none' } }}>
                        <ListItemIcon>
                            <FemaleOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Mujeres'} />
                    </ListItem>

                    <ListItem 
                        button 
                        onClick={ () => navigateTo('/category/kid') }
                        sx={{ display: { xs: '', sm: 'none' } }}>
                        <ListItemIcon>
                            <EscalatorWarningOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Niños'} />
                    </ListItem>

                    {
                        isLoggedIn
                            ? (
                                <ListItem 
                                    onClick={ onLogout }
                                    button
                                >
                                    <ListItemIcon>
                                        <LoginOutlined />
                                    </ListItemIcon>
                                    <ListItemText primary={'Salir'} />
                                </ListItem>
                            )
                            : (
                                <ListItem 
                                    button
                                    onClick={ () => navigateTo(`/auth/login?p=${ router.asPath }`) }
                                >
                                    <ListItemIcon>
                                        <VpnKeyOutlined />
                                    </ListItemIcon>
                                    <ListItemText primary={'Ingresar'} />
                                </ListItem>
                            )
                    }

                    {
                        (user?.role === 'admin') && (
                            <>
                                <Divider />
                                <ListSubheader>Admin Panel</ListSubheader>

                                <ListItem button>
                                    <ListItemIcon>
                                        <CategoryOutlined />
                                    </ListItemIcon>
                                    <ListItemText primary={'Productos'} />
                                </ListItem>
                                <ListItem button>
                                    <ListItemIcon>
                                        <ConfirmationNumberOutlined />
                                    </ListItemIcon>
                                    <ListItemText primary={'Ordenes'} />
                                </ListItem>

                                <ListItem button>
                                    <ListItemIcon>
                                        <AdminPanelSettings />
                                    </ListItemIcon>
                                    <ListItemText primary={'Usuarios'} />
                                </ListItem>
                            </>
                        )
                    }
                </List>
            </Box>
        </Drawer>
    )
}
