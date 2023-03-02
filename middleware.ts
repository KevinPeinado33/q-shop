import { NextResponse, type NextRequest } from 'next/server'

import { jwt } from './utils'

export async function middleware ( req: NextRequest ) {

    const token = req.cookies.get('token')?.value || ''
    
    console.log({ token })

    try {

        await jwt.isValidToken( token )

        console.log('Entrooo aquiii')
        
        return NextResponse.next()

    } catch ( error ) {

        const requestedPage = req.nextUrl.pathname
        const url           = req.nextUrl.clone()
    
        url.pathname = `/auth/login`
        url.search   = `p=${ requestedPage }`

        return NextResponse.redirect( url )

    }

}

export const config =  {
    matcher: ['/checkout/address', '/checkout/summary']
}
