import Express from "express";
import router from "../router/index.js";

import session from "express-session";
import passport from "passport";

const express = Express();
const port = 3000;

express.use(Express.urlencoded({ extended: true }));
express.use("/public", Express.static("./assets"));
express.set("view engine", "ejs");

express.use(
  session({
    secret: "mys3cr3t",
    resave: false,
    saveUninitialized: false,
  })
);
express.use(passport.authenticate("session"));

express.use("/", router);

export { express, port };
