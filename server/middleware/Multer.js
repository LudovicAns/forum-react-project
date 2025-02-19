import multer from "multer";
import path from "path";
import fs from "fs";
import JwtService from "../service/JwtService.js";

const avatarDirectory = "public/avatars/";

function deleteOldAvatar(userId, req, file, cb) {
    fs.readdir(avatarDirectory, (err, files) => {
        if (err) {
            console.error("Erreur lors de la lecture du répertoire:", err);
            return cb(err);
        }

        files.forEach(filename => {
            if (filename.startsWith(`${userId}-`)) {
                fs.unlink(path.join(avatarDirectory, filename), (err) => {
                    if (err) {
                        console.error("Erreur lors de la suppression de l'ancien avatar:", err);
                    }
                });
            }
        });
    });
}

const avatarDiskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, avatarDirectory);
    },
    filename: function (req, file, cb) {
        const token = req.cookies.access_token;
        const jwt = JwtService.verify(token);
        const userId = jwt.payload.id;

        deleteOldAvatar(userId, req, file, cb);

        cb(null, `${userId}-${new Date(Date.now()).toISOString()}${path.extname(file.originalname)}`);
    }
});

export const uploadAvatar = multer({ storage: avatarDiskStorage }).single('avatar');
