import mongoose from 'mongoose'
import { logger } from '../config/logger.js'
import { ApiError } from '../utils/apiError.js'

//* 404 error handler
const notFound = (req, res, next) => {
  const error = `Route [ ${req.originalUrl} ] not found.`
  return next(new ApiError(error, 404))
}

// error converter
const errorConverter = (err, req, res, next) => {
  let error = err

  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error ? 400 : 500
    const message =
      error.message ||
      (statusCode === 400 && 'Bad Request') ||
      (statusCode === 500 && 'Internal Server Error')

    error = new ApiError(message, statusCode, false, err.stack)
  }

  next(error)
}

// error handler
const errorHandler = (err, req, res, next) => {
  let { message, statusCode, stack } = err

  //* Do not leak real error in production
  if (process.env.NODE_ENV === 'production' && !err.isOperational) {
    statusCode = 500
    message = 'Internal Server Error'
  }

  if (err.isOperational) {
    logger.warn(`Operational Error: ${err.message}`, {
      statusCode: err.statusCode,
      path: req.originalUrl,
      method: req.method,
      ip: req.ip,
      userAgent: req.headers['user-agent'],
      errors: err.message,
      stack: err.stack
    })
  } else {
    logger.error(`Programming Error: ${err.message}`, {
      statusCode: err.statusCode,
      path: req.originalUrl,
      method: req.method,
      ip: req.ip,
      userAgent: req.headers['user-agent'],
      errors: err.message,
      stack: err.stack
    })
  }

  //* structured error response
  const errorResponse = {
    error: true,
    code: statusCode,
    message,
    stack: process.env.NODE_ENV === 'development' ? stack : null
  }


  //* return error response
  res.status(statusCode).json(errorResponse)
}

export { notFound, errorConverter, errorHandler }
