import { response } from "./utils/response.js"
import User from '../models/user.js'
import bcrypt from 'bcrypt'
import crypto, { hash } from 'crypto'
import { login_regex, user_regex } from "./validations/auth.validation.js"
import jwt from "jsonwebtoken"


const register = async user_request => {

    const { error } = user_regex.validate(user_request)
    if (error) return response(false, error.details[0].message)
        
    const is_nickname = await User.findOne({ nickname: user_request.nickname})
    if (is_nickname) return response(false, 'nickname already exist')

    const is_cel = await User.findOne({ cel: user_request.cel})
    if (is_cel) return response(false, 'celular already exist')

    delete user_request.confirm_password

    // Crear una instancia del objeto hash usando el algoritmo SHA-1
    const tempSHA1 = crypto.createHash('sha1');

    // Actualizar el hash con la contraseña
    tempSHA1.update(user_request.password);

    // recupero el valor hash en formato hexadecimal
    const hashedPassword = tempSHA1.digest('hex');

    user_request = {
        ...user_request,
        password: hashedPassword
    }
    
    const new_user = new User(user_request)

    await new_user.save()

    const user = { ...new_user.toObject() }

    delete user.password

    return response(true, 'user created', { user })
}

const login = async (login_request) => {

    const { error } = login_regex.validate(login_request)
    if (error) return response(false, error.details[0].message)

    const user_db = await User.findOne({ nickname: login_request.nickname})
    if (!user_db) return response(false, 'User don\'t exist')
    
    const valid_password = await bcrypt.compare(login_request.password, user_db.password)
    if (!valid_password) return response(false, 'Incorrect password')

    let score_db = await Score.findOne({ user_id: user_db._id })
    if (!score_db) {
        score_db = new Score({ user_id: user_db._id });
        await score_db.save();
    }

    const user = {
        ...user_db.toObject(),
        score: score_db.toObject()
    }

    delete user.password

    const payload = {
        user
    }

    const sign_options = { expiresIn: '3600s'}

    const token = jwt.sign(payload, process.env.TOKEN, sign_options)

    return response(true, 'Login success', token)
}

export {
    register,
    login
}