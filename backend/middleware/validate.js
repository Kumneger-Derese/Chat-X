import { ApiError } from '../utils/apiError.js'

const validate =
  (schema, prop = 'body') =>
  (req, res, next) => {
    const { error, value } = schema.validate(req[prop])

    if (error) {
      const errors = error.details.map(detail => detail.message)
      return next(new ApiError(errors, 400))
    }

    req[prop] = value
    next()
  }

export { validate }
