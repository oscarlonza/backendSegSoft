import { Router } from "express";
import { exportAllUser, encryptFile, decryptFile } from "../controllers/functions.controller.js";
import { valid_token } from "../services/middleware/valid-token.js";

const functions_router = Router()

functions_router.post('/exportAll', valid_token, exportAllUser)

functions_router.post('/encrypt', encryptFile)

functions_router.post('/decrypt', decryptFile)

export default functions_router