import JwtService from "../service/JwtService.js";

export default function (req, res, next) {
    const cookies = req.cookies;

    if (!cookies || !cookies.access_token) {
        return res.status(401).json({
            message: 'Vous devez être authentifié'
        });
    }

    const jwt = JwtService.verify(cookies.access_token);

    if (!jwt.success) {
        res.status(401).json({
            message: jwt.message
        });
    }

    res.locals.id = jwt.payload.id;
    next();
}