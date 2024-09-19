import { Router } from "express";
import { exportAllUser, encryptFile, decryptFile } from "../controllers/functions.controller.js";
import { valid_token } from "../services/middleware/valid-token.js";

const functions_router = Router()

//functions_router.get('/exportAll', valid_token, exportAllUser)
functions_router.get('/exportAll', exportAllUser)

functions_router.post('/encrypt', valid_token, encryptFile)

functions_router.post('/decrypt', valid_token, decryptFile)

export default functions_router