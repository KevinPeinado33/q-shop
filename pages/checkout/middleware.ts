import { type NextRequest, NextResponse } from 'next/server'

import { jwt } from '@/utils'

export async function middleware ( req: NextRequest ) {

    const previousPage = req.nextUrl.pathname

    if ( previousPage.startsWith('/checkout') ) {
     
        const token = req.cookies.get('token')?.value || ''
        
        try {
            await jwt.isValidToken( token )
            return NextResponse.next()
        } catch( error ) {
            console.log(req.page)
            return NextResponse.redirect(
                new URL(`/auth/login?p=${ previousPage }`, req.url)
            )
        }
        
    }
}

export const config =  {
    matcher: [
        '/checkout/:path*'
    ]
}
