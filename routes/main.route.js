import { Router } from "express";
import { test } from "../controllers/main.controller.js";
import { valid_token } from "../services/middleware/valid-token.js";
import auth_router from "./auth.route.js";

const router = Router();

router.get("/test", test);

router.use("/auth", auth_router);
//router.use("/user", valid_token, user_router);

export default router;
