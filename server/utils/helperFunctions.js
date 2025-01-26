export function asyncHandler(func) {
  return async function (req, res, next) {
    try {
      await func(req, res, next); // replace (req, res, next) with  (...arguements)
    } catch (err) {
      next(err);
    }
  };
}

export function respondSuccess(
  statusCode = 200,
  data = {},
  res,
  otherDetails = {}
) {
  res.status(statusCode).json({
    status: "success",
    ...otherDetails,
    data,
  });
}

export function filterObj(obj, allowedFields) {
  const result = {};

  for (let field of allowedFields) {
    if (!obj[field]) continue;

    result[field] = obj[field];
  }

  return result;
}
