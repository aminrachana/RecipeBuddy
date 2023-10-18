const authRouter = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const { JWT_SECRET } = process.env

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// POST - register user
authRouter.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'Missing required fields',
                success: false
            })
        }
        if(!emailRegexp.test(email)){
            return res.status(400).json({
                message: 'Invalid email address',
                success: false
            })
        }

        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                message: 'Email already in use',
                success: false
            })
        }

        user = new User({
            name,
            email,
            password,
            role
        })

        const slat = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, slat)
        await user.save()

        jwt.sign({ id: user._id }, JWT_SECRET, {
            expiresIn: 36000
        }, (err, token) => {
            if (err) throw err
            res.status(200).json({
                userData: user,
                token
            })
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: err?.message, success: false })
    }
})

// POST - login user
authRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and Password are required',
                success: false
            })
        }

        let user = await User.findOne({ email })
        if (!user) return res.status(400).json({
            message: 'Invalid credentials',
            success: false
        })

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({
            message: 'Incorrect password',
            success: false
        })

        jwt.sign({ id: user._id }, JWT_SECRET, {
            expiresIn: 36000
        }, (err, token) => {
            if (err) throw err
            res.status(200).json({
                userData: user,
                token
            })
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: err?.message, success: false })
    }
})

module.exports = authRouter