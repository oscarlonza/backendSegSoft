import { Router } from "express";
import { test } from "../controllers/main.controller.js";
import { csrfProtection, valid_token } from "../services/middleware/valid-token.js";
import auth_router from "./auth.route.js";
import functions_router from "./functions.route.js";
import csrftoken_router from "./csrftoken.route.js";

const router = Router();

router.get("/test", test);
router.get("/csrf-token", csrfProtection, csrftoken_router);
router.use("/auth", auth_router);
router.use("/functions", functions_router);
//router.use("/user", valid_token, user_router);

export default router;
