// Custom error class extending the built-in Error class
export default class AppError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.isOperational = true;
    this.statusCode = statusCode;

    // Setting the status based on the status code
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";

    // Capturing the stack trace for debugging purposes
    Error.captureStackTrace(this, this.constructor);
  }
}
