const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Review } = require('../models/models')


const generateJWT = (id, login, email, role) => {
    return jwt.sign({ id, login, email, role },
        process.env.SECRET_KEY,
        { expiresIn: '200h' }
    )
}

class UserController {
    async registration(req, res, next) {
        const { login, email, password, role } = req.body
        if (!email || !password || !login) {
            return next(ApiError.badRequest('Заполните все поля'))
        }
        const candidate = await User.findOne({ where: { email } })
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }

        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({ login, email, role, password: hashPassword })

        const token = generateJWT(user.id, user.login, user.email, user.role)
        return res.json({ token })
    }

    async login(req, res, next) {
        const { login, password } = req.body
        const user = await User.findOne({ where: { login } })
        if (!user) {
            return next(ApiError.internal('Пользователь не существует'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Неверный пароль'))
        }
        const token = generateJWT(user.id, user.login, user.email, user.role)
        return res.json({ token })

    }
    async check(req, res, next) {
        const token = generateJWT(req.user.id, req.user.login, req.user.email, req.user.role)
        return res.json({ token })
    }
}

module.exports = new UserController()