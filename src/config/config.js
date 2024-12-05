import express from "express";
import session from "express-session";
import passport from "../middleware/auth.js";
import router from "../router/index.js";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static("./assets"));
app.set("view engine", "ejs");

app.use(
  session({
    secret: "mys3cr3t",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", router);

export { app, port }; // Aqui está a exportação