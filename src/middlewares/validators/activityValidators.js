const { param } = require("express-validator");

const bookingValidation = () =>
  param("activityId")
    .notEmpty()
    .withMessage("Activity ID is required")
    .isMongoId()
    .withMessage("Invalid MongoDB ID format")


module.exports = bookingValidation
