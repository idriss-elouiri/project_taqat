import express from "express";
import * as authAdminController from "./auth.controller.js";

const router = express.Router();

router.post(
  "/register",
  authAdminController.registerHandler
);
router.post("/login", authAdminController.loginHandler);

export default router;