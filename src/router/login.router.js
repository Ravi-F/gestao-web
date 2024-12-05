import express from "express";
import { body } from "express-validator";
import bcrypt from "bcrypt";
import passport from "passport";
import LocalStrategy from "passport-local";
import User from "../database/model/user.model.js";
import LoginController from "../controller/login.controller.js";

passport.use(
  new LocalStrategy({ usernameField: "email", passwordField: "password" }, async function verify(email, password, cb) {
    const user = await User.findOne({ where: { email } });
    if (!user) return cb(null, false, { message: "E-mail ou senha inválidos" });

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (isPasswordMatch) {
      return cb(null, user);
    }

    return cb(null, false, { message: "E-mail ou senha inválidos" });
  })
);

passport.serializeUser ((user, cb) => {
  process.nextTick(() => {
    cb(null, { id: user.id, username: user.email });
  });
});

passport.deserializeUser ((user, cb) => {
  process.nextTick(() => {
    return cb(null, user);
  });
});

const router = new express.Router();
const loginController = new LoginController();

router.get("/login", loginController.renderLogin);
router.get("/register", loginController.renderRegister);
router.post("/login", passport.authenticate('local', {
  successRedirect: "/perfil",
  failureRedirect: "/login",
  failureMessage: "Email ou senha inválidos!"
}));

router.post(
  "/register",
  body("name").notEmpty().trim(),
  body("email").notEmpty().isEmail().trim(),
  body("password").notEmpty().trim(),
  loginController.register
);

// Rota para logout
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err); 
    }
    res.redirect('/login'); 
  });
});

export default router;