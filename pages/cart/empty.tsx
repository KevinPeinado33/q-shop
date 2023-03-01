import NextLink from 'next/link'
import { RemoveShoppingCart } from '@mui/icons-material'
import { Box, Link, Typography } from '@mui/material'

import { ShopLayout } from '@/components/layouts'

const EmptyPage = () => {
    return (
        <ShopLayout
            title='Carrito de compra vacio'
            pageDescription='No existe articulos en el carrito de compras'
        >
            <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                height='calc(100vh - 200px)'
                sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
            >
                <RemoveShoppingCart sx={{ fontSize: 100 }} />
                <Box display='flex' flexDirection='column' alignItems='center'>
                    <Typography>
                        Su carrito esta vacio
                    </Typography>
                    <NextLink href='/' passHref legacyBehavior >
                        <Link typography='h4' color='secondary' >
                            Regresar con ella
                        </Link>
                    </NextLink>
                </Box>
            </Box>
        </ShopLayout>
    )
}

export default EmptyPage