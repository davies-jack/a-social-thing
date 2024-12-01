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
const PASSWORD_MISMATCH_BODY = {
    username: 'testuser',
    email: 'test@test.com',
    password: 'password',
    confirmPassword: 'wrong-password',
};
const NORMAL_BODY = {
    username: 'testuser',
    email: 'test@test.com',
    password: 'password',
    confirmPassword: 'password',
};
const INVALID_USERNAME_BODY = {
    username: 'testuser@test.com',
    email: 'test@test.com',
    password: 'password',
    confirmPassword: 'password',
};
const HEADERS = {
    'Content-Type': 'application/json',
};

describe('POST /api/auth/register', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    
    it('should return 400 if missing required fields', async () => {
        const req = await createPostRequest(
            'http://localhost:3000/api/auth/register',
            EMPTY_BODY,
            HEADERS
        );

        const response = await POST(req);
        const body = await response.json();

        expect(response.status).toBe(400);
        expect(body.message).toBe('Missing required fields');
    });
    it("should return 400 if the username contains invalid characters", async () => {
        const req = await createPostRequest(
            'http://localhost:3000/api/auth/register',
            INVALID_USERNAME_BODY,
            HEADERS
        );

        const response = await POST(req);
        const body = await response.json();

        expect(response.status).toBe(400);
        expect(body.message).toBe('Username can only contain letters and numbers');
    });
    it("should return 400 if passwords do not match", async () => {
        const req = await createPostRequest(
            'http://localhost:3000/api/auth/register',
            PASSWORD_MISMATCH_BODY,
            HEADERS
        );

        const response = await POST(req);
        const body = await response.json();

        expect(response.status).toBe(400);
        expect(body.message).toBe('Passwords do not match');
    });
    it('should return 400 if email already exists', async () => {
       (mockPrisma.user.findUnique as jest.Mock).mockResolvedValueOnce(true);

       const req = await createPostRequest(
        'http://localhost:3000/api/auth/register',
        NORMAL_BODY,
        HEADERS
       );

       const response = await POST(req);
       const body = await response.json();

       expect(response.status).toBe(400);
       expect(body.message).toBe('Email already exists');
    });
    it("should return 400 if username already exists", async () => {
        (mockPrisma.user.findUnique as jest.Mock).mockResolvedValueOnce(false).mockResolvedValueOnce(true);

        const req = await createPostRequest(
            'http://localhost:3000/api/auth/register',
            NORMAL_BODY,
            HEADERS
        );

        const response = await POST(req);
        const body = await response.json();

        expect(response.status).toBe(400);
        expect(body.message).toBe('Username already exists');
    });
    it('should return 200 if registration is successful', async () => {
        (mockPrisma.user.findUnique as jest.Mock).mockResolvedValueOnce(null).mockResolvedValueOnce(null);
        (mockPrisma.user.create as jest.Mock).mockResolvedValueOnce({
            id: '1',
            username: NORMAL_BODY.username,
            email: NORMAL_BODY.email,
        });

        const req = await createPostRequest(
            'http://localhost:3000/api/auth/register',
            NORMAL_BODY,
            HEADERS
        );

        const response = await POST(req);
        const body = await response.json();

        expect(response.status).toBe(201);
        expect(body.message).toBe('You have successfully registered.');
        expect(body.user).toBeDefined();
        expect(body.user.username).toBe(NORMAL_BODY.username);
    });
    it('should return 500 if error occurs', async () => {
        (mockPrisma.user.findUnique as jest.Mock).mockRejectedValueOnce(new Error('Database error'));

        const req = await createPostRequest(
            'http://localhost:3000/api/auth/register',
            NORMAL_BODY,
            HEADERS
        );

        const response = await POST(req);
        const body = await response.json();

        expect(response.status).toBe(500);
        expect(body.message).toBe('Internal server error');
    });
});
