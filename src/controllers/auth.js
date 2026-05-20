const User = require("../models/user")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.signUp = (req, res, next) => {
    const { userName, password, emailId } = req.body
    bcrypt.hash(password, 12)
        .then(hashedPassword => {
            const newUser = new User({
                userName,
                password: hashedPassword,
                emailId
            })

            return newUser.save()
        })
        .then(result => {
            res.status(201).json({ message: 'User created', userId: result._id })
        })
        .catch(err => {
            res.status(err.statusCode || 500).json({
                message: err.message
            })
        })
}

exports.login = (req, res, next) => {
    const { emailId, password } = req.body
    let loadedUser
    User.findOne({ emailId })
        .then(res => {
            if (res) {
                loadedUser = res
                return bcrypt.compare(password, res.password)
            }
            const error = new Error('User with the emailId entered could not be found.')
            error.statusCode = 401
            throw error
        })
        .then(isValid => {
            if (isValid) {
                const token = jwt.sign(
                    {
                        emailId: loadedUser.emailId,
                        userId: loadedUser._id.toString()
                    },
                    'Thisismysecretkey',
                    { expiresIn: '1h' }
                )

                return res.status(200).json({ token, user: {
                    userId: loadedUser._id,
                    userName: loadedUser.userName,
                    emailId: loadedUser.emailId
                } })
            }
            const error = new Error('Password is incorrect.')
            error.statusCode = 401
            throw error
        })
        .catch(err => {
            res.status(err.statusCode || 500).json({
                message: err.message
            })
        })
}