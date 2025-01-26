import getOperationalErrors from "../utils/getOperationalErrors.js";

// Global Error Handling Middleware
export default function GlobalErrorHandler(err, req, res, next) {
  const { NODE_ENV } = process.env;

  // Default status and status-code
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (NODE_ENV === "production") {
    sendErrorForProd(err, req, res); // Handle errors in production environment
  } else {
    sendErrorForDev(err, req, res); // Handle errors in development environment
  }
}

/*
 
*/

// Function to handle errors in development environment
function sendErrorForDev(err, req, res) {
  res.status(err.statusCode || 500).json({
    message: err.message || "error",
    status: err.status,
    statusCode: err.statusCode,
    error: err,
    stack: err.stack,
  });
}

/*

*/

// Function to handle errors in production environment
function sendErrorForProd(err, req, res) {
  // Extract operational errors if any, using utility function
  const error = getOperationalErrors(err);

  // If the error is operational, send the error details to the client
  if (error.isOperational) {
    return res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  }

  // If the error is not operational, send a generic error message
  return res.status(500).json({
    status: "error",
    message: "Something went wrong",
  });
}
