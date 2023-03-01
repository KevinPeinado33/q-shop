import type { NextApiRequest, NextApiResponse } from 'next'

import { db, seedDB } from '@/database'
import { Product } from '@/models'

type Data = { message: string }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if ( process.env.NODE_ENV === 'production' ) {
        return res
                .status(401)
                .json({ message: 'No tienes accesso a la api.' })
    }

    await db.connect()
    await Product.deleteMany()
    await Product.insertMany( seedDB.initialData.products )

    await db.disconnect()

    res
        .status(200)
        .json({ message: 'Proceso realizado correctamente.' })

}
