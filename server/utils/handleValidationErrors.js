import { validationResult } from "express-validator";

export default (req, _, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(ApiError.BadRequest("Validation error", errors.array()));
  }
  next();
};
