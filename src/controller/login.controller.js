import { validationResult } from "express-validator";

import User from "../database/models/user.model.js";
import bcrypt from "bcrypt";

class LoginController {
  
  renderLogin(req, res) {
    if (req.query.fail) {
      res.render("login", { message: "Usiário ou senha inválidos" });
    } else {
      res.render("login", { message: null });
    }
    
  }

  renderRegister(req, res) {
    res.render("register");
  }

  login(req, res) {
    res.redirect("/tasks");
  }

  async register(req, res) {
    const SALT_ROUNDS = 10;
    const result = validationResult(req);
    if (result.isEmpty) {
      const name = req.body.name;
      const email = req.body.email;
      const password = req.body.password;

      const hash = await bcrypt.hash(password, SALT_ROUNDS);

      const user = await User.create({ name, email, password: hash });
      console.log(user);
      return res.redirect("/login");
    }
    res.render("/register");
  }
}

export default LoginController;
