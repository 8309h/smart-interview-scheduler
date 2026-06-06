export const validateQuery = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.query, { abortEarly: false, allowUnknown: true });
  if (error) {
    const details = error.details.map((detail) => detail.message);
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'Validation failed',
      errors: details,
    });
  }
  req.query = value;
  next();
};
