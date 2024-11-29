import prisma from '@/utils/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const body = await request.json();
    const { email, password } = body;
    
    if (!email || !password) {
        return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}