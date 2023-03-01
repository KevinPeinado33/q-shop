import NextLink from 'next/link'
import { Chip, Grid, Link, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

import { ShopLayout } from '@/components/layouts/ShopLayout'
import { GridColDef, GridRenderCellParams  } from '@mui/x-data-grid/models'

const columns: GridColDef[] = [
    { field: 'id',       headerName: 'ID',              width: 100 },
    { field: 'fullname', headerName: 'Nombre Completo', width: 300 },
    {
        field: 'paid',
        headerName: 'Pagada',
        description: 'Muestra información de la orden pagada o no',
        width: 200,
        renderCell: ( { row }: GridRenderCellParams ) => {
            return (
                row.paid
                    ? <Chip color='success' label='Pagada' variant='outlined'/>
                    : <Chip color='error' label='No pagada' variant='outlined'/>
            )
        }
    },
    {
        field: 'orden',
        headerName: 'Ver orden',
        width: 200,
        sortable: false,
        renderCell: ( { row }: GridRenderCellParams ) => {
            return (
                <NextLink href={`/orders/${ row.id }`} passHref legacyBehavior>
                    <Link underline='always'>
                        Ver orden
                    </Link>
                </NextLink>
            )
        }
    },
]

const row = [
    { id: 1, paid: true,  fullname: 'Aldair es kbro'},
    { id: 2, paid: false, fullname: 'Ivan loco nuevos retos'},
    { id: 3, paid: true,  fullname: 'Eddy invicible'},
    { id: 4, paid: false, fullname: 'Renato ñao ñao desaparecido'},
    { id: 5, paid: true,  fullname: 'Cristhian ctmr kcha burras'},
    { id: 6, paid: false, fullname: 'Gustavo hdp'},
    { id: 7, paid: true,  fullname: 'Alina perdoname pofavo tkm, i lof rrhh.'}
]

const HistoryPage = () => {
  return (
    <ShopLayout title='Historial de compras' pageDescription='Historial de ordenes del cliente'>
        <Typography variant='h1' component='h1' >Historial de ordenes</Typography>

        <Grid container>
            <Grid item xs={ 12 } sx={{ height: 650, width: '100%' }} >
                <DataGrid 
                    rows={ row }
                    columns={ columns }
                    pageSize={ 10 }
                    rowsPerPageOptions={ [ 10 ] }
                />
            </Grid>
        </Grid>
    </ShopLayout>
  )
}

export default HistoryPage
