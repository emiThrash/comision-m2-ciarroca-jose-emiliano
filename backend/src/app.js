import express from "express";
import { PORT, DB_URL, SECRET_TOKEN } from "./config/index.js";
import cors from "cors";
import morgan from "morgan";
import { connectMongo } from "./database/db.js";
import authroutes from "./routes/auth.routes.js";
import travelRoutes from "./routes/travel.routes.js";
import cookieParser from "cookie-parser";
import session from "express-session"
import passport from "passport"
import LocalStrategy from "passport-local"
import { validationResult } from "express-validator"
import { validateRegister, validateLogin, handleErrorValidations } from "./middlewares/validateAuth.js";
import userModel from "./models/user.model.js";

const app = express();

connectMongo(DB_URL);

app.use(
  session({
    secret: SECRET_TOKEN,
    resave: false,
    saveUninitialized: false,
  })
)
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id)
    done(null, user)
  } catch (error) {
    done(error, null)
  }
})

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await userModel.findOne({ email })

        if (!user) {
          return done(null, false, { message: "Usuario no encontrado" })
        }

        const isValidPassword = await bcrypt.compare(password, user.password)

        if (!isValidPassword) {
          return done(null, false, { message: "Contraseña incorrecta" })
        }

        return done(null, user)
      } catch (error) {
        return done(error)
      }
    }
  )
)

app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))
app.use(
  cors({
    origin: "http://localhost:4000",
    credentials: true,
  })
);
app.use(authroutes)
app.use(travelRoutes)

app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`))
