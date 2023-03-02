import { type NextRequest, NextResponse } from 'next/server'
import { } from 'next-auth/jwt'

import { jwt } from '@/utils'

export async function middleware ( req: NextRequest ) {

    const session = await getToken({ req, secret: process.env.JWT_SECRET_SEED })

}

export const config =  {
    matcher: ['/checkout/address', '/checkout/summary']
}
