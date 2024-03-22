import { cookies } from "next/headers";

export async function GET () {
    cookies().set({
        name: 'cookie_ok', 
        value: 'ok',
        domain: process.env.NODE_ENV === 'production' 
            ? '.freelbee.com' : 'localhost',
        maxAge: 1000 * 60 * 60 * 24 * 365,
        sameSite: 'none',
        secure: true
    });
    
    return Response.json("cookies was set successfully");
}