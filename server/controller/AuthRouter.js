import express from "express";
import {UserService} from "../service/UserService.js";
import Auth from "../middleware/Auth.js";
import {UserRepository} from "../model/dao/repository/UserRepository.js";
import {userDto} from "../model/dto/User.js";

const router = express.Router();

router.post("/register", async (req, res) => {
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

router.post("/login", async (req, res) => {
    UserService.login(req.body)
        .then(({user, token}) => {
            res
                .cookie('access_token', token, {
                    httpOnly: true,
                    secure: false,
                    sameSite: "Lax",
                    maxAge: 24*60*60*1000,
                })
                .status(200)
                .json({
                    message: "Connexion réussie",
                    data: userDto(user)
                });
        })
        .catch(error => {
            res.status(400).json({
                message: error.message,
            })
        })
});

router.post("/logout", async (req, res) => {
    res.clearCookie('access_token').status(200).json({
        message: "Déconnexion réussie"
    });
})

router.get("/me", Auth, async (req, res) => {
    const userId = res.locals.id;

    let user = await UserRepository.getById(userId);

    user = userDto(user);

    res.status(200).json({
        message: "Informations utilisateur récupérées",
        data: user
    })
})

export default router;