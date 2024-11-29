import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const body = await request.json();
    const { email, password } = body;
    
    return NextResponse.json(
        { message: `Hello, world! - ${email} ${password}` },
        { status: 200 }
    );
}
