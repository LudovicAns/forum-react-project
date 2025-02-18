import express from "express";
import {UserService} from "../service/UserService.js";
import Auth from "../middleware/Auth.js";
import {UserRepository} from "../model/dao/repository/UserRepository.js";
import {userDto} from "../model/dto/User.js";

const router = express.Router();

router.post("/register", (req, res) => {
    UserService.register(req.body)
        .then(user => {
            res.status(201).json({
                message: "Inscription réussie avec succès",
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
                message: "Connexion réussie",
                data: token
            });
        })
        .catch(error => {
            res.status(400).json({
                message: error.message,
            })
        })
})

router.post("/logout", (req, res) => {
    res.clearCookie('jwt');
    res.status(200).json({
        message: "Déconnexion réussie"
    });
})

router.get("/me", Auth, async (req, res) => {
    const userId = res.locals.id;

    const user = await UserRepository.getById(userId);

    const userDto = userDto(user);

    res.status(200).json({
        message: "Informations utilisateur récupérées",
        data: userDto
    })
})

export default router;