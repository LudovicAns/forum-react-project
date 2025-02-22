import express from 'express';
import AuthMiddleware from "../middleware/auth-middleware.js";
import {CommentService} from "../service/comment-service.js";

const router = express.Router();

router.post("/", AuthMiddleware, async (req, res) => {
    // Implement code.
    const newComment = req.body;

    CommentService.addComment(newComment)
        .then(comment => {
            return res.status(201).json({
                message: "Commentaire ajouté avec succès",
                data: comment
            })
        })

    res.status(501).json({
        message: "Not implemented yet."
    });
});

router.get("/", AuthMiddleware, async (req, res) => {
    // Implement code.
    res.status(501).json({
        message: "Not implemented yet."
    });
});

router.get("/:id", AuthMiddleware, async (req, res) => {
    // Implement code.
    res.status(501).json({
        message: "Not implemented yet."
    });
});

router.put("/:id", AuthMiddleware, async (req, res) => {
    // Implement code.
    res.status(501).json({
        message: "Not implemented yet."
    });
});

router.delete("/:id", AuthMiddleware, async (req, res) => {
    // Implement code.
    res.status(501).json({
        message: "Not implemented yet."
    });
})

export default router;