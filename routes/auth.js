const express = require('express')
const router = express.Router()
const userModel = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')
require('dotenv').config()


// user signIn 

router.post('/signIn', async (req, res) => {

    const { name, email, password } = req.body


    if (!name || !email || !password) {
        return res.status(401).json({ message: 'please fill the details' })
    }
    if (password.length < 8) {
        return res.status(401).json({ message: "Password must be atleast 8 character or more" })
    }

    try {

        const validEmail = await userModel.findOne({ email })
        if (validEmail) {
            return res.status(400).json({ message: "user is already exists" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(password, salt)

        const user = new userModel({ name, email, password: hashPass })

        await user.save()

        const payload = {
            userId: user.id
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET)

        res.status(201).json({ token, success: true, message: "user succesfully sign In" })




    } catch (error) {

        res.status(500).json({ message: `${error}` })


    }




})


// user login 
router.post('/login', async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(401).json({ message: "Please enter email or password" })
    }
    if (password.length < 8) {
        return res.status(401).json({ message: "Password must be atleast 8 character or more" })
    }

    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).json({ success: false, message: "Incorrect Email or password" })
        }

        const comparePass = await bcrypt.compare(password, user.password)

        if (!comparePass) {
            return res.status(401).json({ success: false, message: "Incorrect password" })

        }

        const payload = {
            userId: user.id
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET)

        res.status(200).json({ success: true, token, message: "User login successfully" })



    } catch (error) {
        res.status(500).json({ message: `${error}` })


    }
})

router.get('/get/:id', async (req, res) => {

    try {

        const userId = req.params.id


        if (!userId) { return res.status(400).json({ message: "Not found" }) }

        const user = await userModel.findById(userId).select("-password ")
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }


        res.status(200).json({ user })

    } catch (error) {
        res.status(500).json({ message: `${error}` })
    }
})

// auth of google
// router.get('/login/success/:googleID', async (req, res) => {

//     const IsgoogleID = req.params.googleID
//     const user = await userModel.findOne({googleId:IsgoogleID})
//     if (user) {
//         const token = jwt.sign({ userID: user.googleId }, process.env.JWT_SECRET)
//         res.status(200).json({ "token": token })
//     } else {
//         res.status(400).json({ success: false })
//     }
// })
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
    '/google/callback',
    passport.authenticate('google',
        {
            successRedirect: 'http://localhost:3000',
            failureRedirect: 'http://localhost:3000/login',
            session: false
        })

);







module.exports = router;