import express from "express";
import {UserService} from "../service/UserService.js";

const router = express.Router();

router.post("/register", (req, res) => {
    UserService.register(req.body)
        .then(user => {
            res.status(201).json({
                message: "User registered",
                data: user
            });
        })
        .catch(error => {
            res.status(400).json({
                message: error.message,
            })
        })
});

router.post("/login", (req, res) => {
    UserService.login(req.body)
        .then(token => {
            res.cookie('jwt', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'none',
            })
            res.status(200).json({
                message: "User logged in",
                data: token
            });
        })
        .catch(error => {
            res.status(400).json({
                message: error.message,
            })
        })
})

export default router;