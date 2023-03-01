import type { NextPage } from 'next'
import { Box, Typography } from '@mui/material'
import { ShopLayout } from '@/components/layouts'

const Custome404: NextPage  = () => {
  return (
    
    <ShopLayout
        title='Page nout found'
        pageDescription='No existe la pagina mi helmano'
    >
        <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            height='calc(100vh - 200px)'
            sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
        >
            <Typography
                variant='h1'
                component='h1'
                fontSize={ 80 }
                fontWeight={ 200 }
            >
                404 |
            </Typography>
            <Typography
                marginLeft={ 2 }
            >
                No encontramos ninguna pagina aqui
            </Typography>
        </Box>
    </ShopLayout>
  )
}

export default Custome404