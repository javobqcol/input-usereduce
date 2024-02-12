import { validationResult, body } from "express-validator"
export const validationResultExpress = (req, res, next) =>{
  const errors = validationResult(req)
    if ( !errors.isEmpty()){
      return res.status(401).json({"error:": errors.array() })
    }
  next()
}

export const bodyRegisterValidator = [
  body("email", "Format Error").trim().isEmail().normalizeEmail(),
  body("password", "Format Error").trim().isLength({ min: 5 }),
  body("password", "Format Error").custom((value, { req }) => {
    if (value !== req.body.repassword) {
      throw new Error("no coinciden las contraseñas");
    }
    return value;
  }),
  validationResultExpress,
]

export const bodyLoginValidator =  [
  body("email", "Format Error").trim().isEmail().normalizeEmail(),
  validationResultExpress,
]


export const bodyLinkValidator =[
  body("longLink", "Formato URL incorrecto")
    .trim()
    .notEmpty()
    .custom((value, { req }) => {
      const URL_REGEXP = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm
      if(URL_REGEXP.test(value)) {
        return value;
      } 
      throw new Error("Url malformed");
    }),
  validationResultExpress,
]
