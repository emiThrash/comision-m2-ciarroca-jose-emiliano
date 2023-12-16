const { body, validationResult } = require("express-validator")

export const createTravel = async (req, res) => {
  // Validación de datos
  body("title").notEmpty().withMessage("El título es obligatorio"),
  body("description").notEmpty().withMessage("La descripción es obligatoria"),
  body("location").notEmpty().withMessage("La descripción es obligatoria"),
  body("startDate").notEmpty().withMessage("La descripción es obligatoria"),
  body("endDate").notEmpty().withMessage("La descripción es obligatoria"),
  body("price").notEmpty().withMessage("La descripción es obligatoria"),
  body("imageUrl").notEmpty().withMessage("La descripción es obligatoria"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
}
