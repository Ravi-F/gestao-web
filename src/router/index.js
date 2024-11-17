import express from "express";

import loginRouter from "./login.router.js";

const router = new express.Router();

router.use(loginRouter);

export default router;
