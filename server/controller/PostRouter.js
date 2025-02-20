import express from "express";
import {PostService} from "../service/PostService.js";
import Auth from "../middleware/Auth.js";

const router = express.Router();

router.post("/create", Auth, async (req, res) => {
    PostService.addPost(req.body)
        .then(post => {
            res.status(201).json({
                message: "Post créé avec succès.",
                data: post
            });
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        });
});

router.get("/", Auth, async (req, res) => {
    PostService.getPosts()
        .then(posts => {
            posts.length > 0 ? res.status(200) : res.status(204);

            return res.json({
                message: "Posts récupérés avec succès.",
                data: posts
            });
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        });
});

router.get("/:id", Auth, async (req, res) => {
    const postId = req.params.id;

    PostService.getPostById({ id: postId})
        .then(post => {
            if (post === null) {
                return res.status(204).json({
                    message: "Post introuvable."
                });
            }

            return res.status(200).json({
                message: "Post récupéré avec succès.",
                data: post
            });
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        });
});

router.delete("/:id", Auth, async (req, res) => {
    const postId = req.params.id;

    PostService.deletePost({ id: postId})
        .then((data) => {
            if (data === null) {
                return res.status(204).json({
                    message: "Post introuvable."
                });
            }
            return res.status(200).json({
                message: "Post supprimé avec succès."
            })
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        });
});

export default router;