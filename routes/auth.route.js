import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
import { csrfProtection } from "../services/middleware/valid-token.js";

const auth_router = Router()

auth_router.post('/register', register)

auth_router.post('/login', csrfProtection, login)

export default auth_router