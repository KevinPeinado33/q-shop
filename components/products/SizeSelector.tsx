import { ISize } from '@/interfaces'
import { Box, Button } from '@mui/material'
import { FC } from 'react'

interface Props {
    selectedSize?:  ISize
    sizes:          ISize[ ]
    onSelectedSize: (size: ISize) => void
}

export const SizeSelector: FC< Props > = ({ selectedSize, sizes, onSelectedSize }) => {
  return (
    <Box>
        {
            sizes.map( size => (
                <Button
                    key={ size }
                    size='small'
                    onClick={ () => onSelectedSize( size ) }
                    color={ selectedSize === size ? 'info' : 'primary' }
                >
                    { size }
                </Button>
            ))
        }
    </Box>
  )
}
