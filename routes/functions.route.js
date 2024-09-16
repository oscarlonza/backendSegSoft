import { Router } from "express";
import { exportAllUser } from "../controllers/functions.controller.js";
import { valid_token } from "../services/middleware/valid-token.js";

const functions_router = Router()

functions_router.post('/exportAll', valid_token, exportAllUser)

export default functions_router