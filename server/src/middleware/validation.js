const { body, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

const validateEnquiry = [
  body('first_name').trim().notEmpty().withMessage('First name is required'),
  body('last_name').trim().notEmpty().withMessage('Last name is required'),
  body('email').trim().isEmail().withMessage('Valid email is required'),
  body('phone').trim().notEmpty().withMessage('Phone number is required'),
  body('company').trim().notEmpty().withMessage('Company is required'),
  body('project_type').trim().notEmpty().withMessage('Project type is required'),
  body('budget').trim().notEmpty().withMessage('Budget is required'),
  body('project_description')
    .trim()
    .isLength({ min: 20 })
    .withMessage('Project description must be at least 20 characters'),
  handleValidationErrors,
];

module.exports = { validateEnquiry, handleValidationErrors };
