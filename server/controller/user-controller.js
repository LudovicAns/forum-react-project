import express from "express";
import {UserService} from "../service/user-service.js";
import Auth from "../middleware/auth-middleware.js";
import {UserRepository} from "../model/dao/repository/user-repository.js";
import {userDto} from "../model/dto/user-dto.js";
import {uploadAvatar} from "../middleware/multer-middleware.js";

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
        .then(({user, token, rememberMe}) => {
            return res
                .cookie('access_token', token, {
                    httpOnly: true,
                    secure: false,
                    sameSite: "Lax",
                    maxAge: rememberMe ? parseInt(process.env.USER_AUTH_EXPIRES_IN_REMEMBER): parseInt(process.env.USER_AUTH_EXPIRES_IN),
                })
                .status(200)
                .json({
                    message: "Connexion réussie",
                    token: token,
                    data: userDto(user)
                });
        })
        .catch(error => {
            return res.status(400).json({
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

router.get("/:id", async (req, res) => {
    const userId = req.params.id;

    UserService.getById(userId)
        .then(user => {
            if (!user) {
                return res.status(204).json({
                    message: "Utilisateur introuvable"
                });
            }

            return res.status(200).json({
                message: "Utilisateur récupéré avec succès.",
                data: userDto(user)
            })
        })
        .catch(error => {
            return res.status(400).json({
                message: error.message,
            })
        })
})

export default router;