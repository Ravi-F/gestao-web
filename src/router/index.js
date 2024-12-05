import express from "express";
import loginRouter from "./login.router.js";
import financeRouter from "./finance.router.js"; 
import homeRouter from "./home.router.js"; 

const router = new express.Router();

router.use(homeRouter); 
router.use(loginRouter);
router.use(financeRouter); 

export default router;