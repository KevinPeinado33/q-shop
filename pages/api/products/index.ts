import type { NextApiRequest, NextApiResponse } from 'next'

import { db, SHOP_CONSTANT } from '@/database'
import { Product } from '@/models'
import { IProduct } from '@/interfaces'

type Data = 
    | { message: string }
    | IProduct[ ]

const handler = (req: NextApiRequest, res: NextApiResponse) => {

    switch ( req.method ) {
        
        case 'GET':
            return getProducts(req, res)

        default:
            return res
                    .status(400)
                    .json({ message: 'Bad request!' })
    
        }

}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { gender = 'all' } = req.query

    let conditions = { }

    if ( gender !== 'all' && SHOP_CONSTANT.validGenders.includes( String(gender) ) ) {
        conditions = { gender } 
    }

    await db.connect()
    const products = await Product
                            .find( conditions )
                            .select( 'title images price inStock slug -_id' )
                            .lean()
    await db.disconnect()

    return res
            .status(200)
            .json( products )

}

export default handler

