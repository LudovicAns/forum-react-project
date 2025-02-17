import express from "express";
import {UserRepository} from "../model/dao/repository/UserRepository.js";

const router = express.Router();

router.post("/", (req, res) => {
    const newUser = req.body;


    UserRepository.create(newUser);

    res.status(201).json({
        message: "Création d'un utilisateur"
    });
});

export default router;