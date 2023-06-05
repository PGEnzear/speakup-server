module.exports = class ApiError extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError(message, errors = []) {
        return new ApiError(401, message || 'Пользователь не авторизован')
    }

    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }

    static NotFound(message, errors = []) {
        return new ApiError(404, message, errors);
    }

    static ServerError(message, errors = []) {
        return new ApiError(500, message, errors);
    }

    static Iamateapot(message, errors = []) {
        return new ApiError(418, message, errors);
    }
}