import express from "express";
import {UserService} from "../service/UserService.js";
import Auth from "../middleware/Auth.js";
import {UserRepository} from "../model/dao/repository/UserRepository.js";
import {userDto} from "../model/dto/User.js";
import {uploadAvatar} from "../middleware/Multer.js";

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
                    maxAge: 60*60*24*1000,
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
    return res.clearCookie('access_token').status(200).json({
        message: "Déconnexion réussie"
    });
})

router.get("/me", Auth, async (req, res) => {
    const userId = res.locals.id;

    let user = await UserRepository.getById(userId);

    user = userDto(user);

    return res.status(200).json({
        message: "Informations utilisateur récupérées",
        data: user
    })
})

router.post("/edit", Auth, async (req, res) => {
    uploadAvatar(req, res, function (err) {
        if (err) {
            console.log(`Erreur lors de l'upload: ${err}`);
        } else {
            if (req.file?.filename) {
                req.body.avatar = req.file.filename;
            }

            UserService.update(res.locals.id, req.body)
                .then(user => {
                    return res.status(200).json({
                        data: userDto(user)
                    })
                })
                .catch(error => {
                    console.log(error)
                    return res.status(400).json({
                        message: error.message
                    })
                });
        }
    });
})

export default router;