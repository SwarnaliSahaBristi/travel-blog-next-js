import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

const privateRoutes=[
    "/destinations-add",
    "/destinations-manage"
]
// This function can be marked `async` if using `await` inside
export async function proxy(req) {
    const token= await getToken({req});
    const reqPath = req.nextUrl.pathName
    const isAuthenticated= Boolean(token)
    const isPrivate = privateRoutes.some(route=> reqPath.startsWith(route))

    if(!isAuthenticated && isPrivate){
        return NextResponse.redirect(new URL('auth/login', req.url))
    }
    console.log(isAuthenticated,reqPath)
//   return NextResponse.redirect(new URL('/home', req.url))
return NextResponse.next()
}
 
// Alternatively, you can use a default export:
// export default function proxy(request) { ... }
 
export const config = {
  matcher: '/private/:path*',
}