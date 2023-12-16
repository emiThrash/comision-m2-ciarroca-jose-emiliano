import jwt from "jsonwebtoken";
import { SECRET_TOKEN } from "../config/index.js";

const secret = SECRET_TOKEN;

export const authRequired = (req, res, next) => {
  //   console.log(req.headers);
  //   console.log(req.headers.cookie);

  //Instalar el cookie-parser para ayudar a express a leer cookies
  const { token } = req.cookies;
  //   console.log(token);
  if (!token)
    return res
      .status(401)
      .json({ message: "Autorización Denegada, debe volver a iniciar sesión" });

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.status(403).json({ message: "Token Invalido" });
    // console.log(user);
    req.user = user;
    // console.log(req.user);
    next();
  });
};
