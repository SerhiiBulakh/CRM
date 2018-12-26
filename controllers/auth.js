const bcrypt = require ('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler');


module.exports.login = async function (req, res) {
    const candidate = await User.findOne({email: req.body.email})

    if( candidate ) {
        // Проверка пароля пользыватель существует
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if(passwordResult) {
            //Генерация токена пароли совпали
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 60 * 60})

            res.status(200).json({
                token: `Bearer ${token}`
            })

        } else {
            res.status(401).json({
                message: "Пароль веден не правильно"
            }) 
        }
    } else {
        // Пользывателя нету
        res.status(404).json({
            message: 'Пользыватель с таким email не найден'
        })
    }
   
}

module.exports.register = async function (req, res) {
    //email password
    const candidate = await User.findOne({email: req.body.email})

    if(candidate) {
        //Пользыватель существует нужно отдать ошибку
        // 409 Статус конфликт
        res.status(409).json({
            message: 'Такой email существует. Попробуйте другой.'
        })
    } else {
        //Создать пользывателя

        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;

        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        })

        try {
            await user.save()
            res.status(201).json(user)
        } catch(e) {
            //Оброботать ошибку
            errorHandler(res, e);
        }
        

    }




}