import { Router } from "express";
import { exportAllUser, encryptFile, decryptFile, exportFile } from "../controllers/functions.controller.js";
import { valid_token } from "../services/middleware/valid-token.js";

const functions_router = Router()

functions_router.get('/exportAll', valid_token, exportAllUser)

functions_router.post('/encrypt', encryptFile)

functions_router.post('/decrypt', decryptFile)

functions_router.get('/:file', exportFile)

export default functions_router