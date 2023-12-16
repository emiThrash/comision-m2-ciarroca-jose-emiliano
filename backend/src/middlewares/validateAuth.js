import { body, validationResult } from "express-validator";

//Validación REGISTER
export const validateRegister = [
  body("username")
    .notEmpty()
    .withMessage("Username no debe estar vacío")
    .isLength({ min: 6 })
    .withMessage("El Username debe tener al menos 6 caractéres"),

  body("email").isEmail().withMessage("Ingresar un mail válido"),

  body("password")
    .notEmpty()
    .withMessage("El Password es obligatorio")
    .isLength({ min: 6 })
    .withMessage("Longitud mínima del password es de 6 caractéres"),
]

//Validación del LOGIN
export const validateLogin = [
  body("email").isEmail().withMessage("Ingresar mail válido"),

  body("password")
    .notEmpty()
    .withMessage("El Password es obligatorio")
    .isLength({ min: 6 })
    .withMessage("Longitud mínima del password es de 6 caractéres"),
]

//Validación del ERROR
export const handleErrorValidations = (req, res, next) => {
  const error = validationResult(req)

  if (!error.isEmpty()) {
    return res.status(400).json([error.errors[0].msg])
    // return res.status(400).json({ message: "Error en la validación", error });
  }
  next()
}
