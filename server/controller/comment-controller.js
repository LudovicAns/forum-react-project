import express from 'express';
import AuthMiddleware from "../middleware/auth-middleware.js";
import {CommentService} from "../service/comment-service.js";

const router = express.Router();

router.post("/", AuthMiddleware, async (req, res) => {
    const newComment = req.body;

    CommentService.addComment(newComment)
        .then(comment => {
            return res.status(201).json({
                message: "Commentaire ajouté avec succès.",
                data: comment
            })
        })
        .catch(error => {
            return res.status(400).json({
                message: error.message
            })
        });
});

router.get("/", AuthMiddleware, async (req, res) => {
    CommentService.getComments()
        .then(comments => {
            return res.status(200).json({
                message: "Commentaires récupérés avec succès.",
                data: comments
            });
        })
        .catch(error => {
            return res.status(400).json({
                message: error.message
            })
        });
});

router.get("/:id", AuthMiddleware, async (req, res) => {
    const commentId = req.params.id;

    CommentService.getCommentById({
        id: commentId,
    })
        .then(comment => {
            if (comment === null) {
                return res.status(204).json({
                    message: "Commentaire introuvable."
                });
            }

            return res.status(200).json({
                message: "Commentaire récupéré avec succès.",
                data: comment
            });
        })
        .catch(error => {
            return res.status(400).json({
                message: error.message
            })
        });
});

router.put("/:id", AuthMiddleware, async (req, res) => {
    const commentId = req.params.id;

    CommentService.updateComment({
        _id: commentId,
        ...req.body,
    })
        .then(comment => {
            return res.status(200).json({
                messasge: "Commentaire mis à jour avec succès.",
                data: comment
            });
        })
        .catch(error => {
            return res.status(400).json({
                message: error.message
            })
        });
});

router.delete("/:id", AuthMiddleware, async (req, res) => {
    const commentId = req.params.id;

    CommentService.deleteComment({
        _id: commentId,
    })
        .then(comment => {
            return res.status(200).json({
                message: "Commentaire supprimé avec succès.",
                data: comment
            });
        })
        .catch(error => {
            return res.status(400).json({
                message: error.message
            })
        });
})

export default router;