const sendError = (res, statusCode, message) => {
  return res.status(statusCode).json({ error: message });
};

const badRequest = (res, message = 'Bad request.') => sendError(res, 400, message);
const unauthorized = (res, message = 'Unauthorized.') => sendError(res, 401, message);
const forbidden = (res, message = 'Forbidden.') => sendError(res, 403, message);
const notFound = (res, message = 'Not found.') => sendError(res, 404, message);
const conflict = (res, message = 'Conflict.') => sendError(res, 409, message);
const serverError = (res, message = 'Server error.') => sendError(res, 500, message);

module.exports = {
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  conflict,
  serverError
};