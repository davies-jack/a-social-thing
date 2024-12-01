interface AppError extends Error {
    statusCode: number;
    code: string;
    data?: unknown;
}

function createAppError(
    statusCode: number,
    message: string,
    code: string,
    data?: unknown
) {
    const error = new Error(message) as AppError;

    error.statusCode = statusCode;
    error.code = code;
    error.data = data;

    return error;
}

export const AppErrors = {
    BAD_REQUEST: (message: string, data?: unknown) => createAppError(400, message, "BAD_REQUEST", data),
    UNAUTHORIZED: (message: string = "Unauthorized") => createAppError(401, message, "UNAUTHORIZED"),
    NOT_FOUND: (message: string = "Resource not found") => createAppError(404, message, "NOT_FOUND"),
    INTERNAL: (message: string = "Internal server error") => createAppError(500, message, "INTERNAL_SERVER_ERROR"),
}