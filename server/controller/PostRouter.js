import express from "express";
import {PostService} from "../service/PostService.js";
import Auth from "../middleware/Auth.js";
import mongoose from "mongoose";

const router = express.Router();

async function CheckIsPostAuthor(req, res, next) {
    const userId = res.locals.id;
    const postId = req.params.id;

    try {
        const post = await PostService.getPostById({id: postId});

        if (!post) {
            return res.status(204).json({
                message: "Post introuvable."
            });
        }

        console.log(post.author.id)
        console.log(new mongoose.Types.ObjectId(userId))

        if (post.author.id.toString() !== userId) {
            return res.status(401).json({
                message: "Vous devez être l'auteur du post pour effectuer cette action."
            });
        }
        return next();
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
}

router.post("/", Auth, async (req, res) => {
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

    PostService.getPostById({id: postId})
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

router.put("/:id", Auth, CheckIsPostAuthor, async (req, res) => {
    const postId = req.params.id;
    const post = req.body;

    PostService.updatePost({
        id_: postId,
        ...post,
    })
        .then(post => {
            if (post === null) {
                return res.status(204).json({
                    message: "Post introuvable."
                });
            }
            return res.status(200).json({
                message: "Post mis à jour avec succès."
            })
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        });
})

router.delete("/:id", Auth, CheckIsPostAuthor, async (req, res) => {
    const postId = req.params.id;

    PostService.deletePost({id: postId})
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