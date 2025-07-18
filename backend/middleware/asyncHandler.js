const asyncHandler = (fn) => async (req, res, next) =>
  await Promise.resolve(fn(req, res, next)).catch((error) => next(error));

export { asyncHandler };

const catchAsync = (fn) => async (req, res, next) => {
  await Promise.resolve(fn(req, res, next)).catch((e) => next(e))
}