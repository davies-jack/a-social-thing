/**
 * @jest-environment node
 */
import prisma from '@/utils/db';
import { POST } from './route';
import { NextRequest } from 'next/server';

jest.mock('@/utils/db', () => ({
    __esModule: true,
    default: {
        user: {
            findUnique: jest.fn(),
            create: jest.fn(),
        },
    },
}));

const mockPrisma = prisma as jest.Mocked<typeof prisma>;

async function createPostRequest(
    url: string,
    body: Record<string, unknown>,
    headers?: Record<string, string>
): Promise<NextRequest> {
    return new NextRequest(
        new Request(url, { method: 'POST', body: JSON.stringify(body), headers })
    );
}

const EMPTY_BODY = {};
const HEADERS = {
    'Content-Type': 'application/json',
};

describe('POST /api/auth/login', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    
    it('should return 400 if missing required fields', async () => {
        const req = await createPostRequest(
            'http://localhost:3000/api/auth/login',
            EMPTY_BODY,
            HEADERS
        );

        const response = await POST(req);
        const body = await response.json();

        expect(response.status).toBe(400);
        expect(body.message).toBe('Email and password are required');
    });
});
