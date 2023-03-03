import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

const client_id = process.env.GITHUB_ID
const client_secret = process.env.GITHUB_SECRET
const nextauth_url = process.env.NEXTAUTH_URL

console.log({ client_id, client_secret, nextauth_url })

export default NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!
        })
    ]
})
