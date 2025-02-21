import JwtService from "../service/jwt-service.js";

export default function (req, res, next) {
    const cookies = req.cookies;

    if (!cookies || !cookies.access_token) {
        return res.status(401).json({
            message: 'Vous devez être authentifié'
        });
    }

    const jwt = JwtService.verify(cookies.access_token);

    if (!jwt.success) {
        return res.status(401).json({
            message: jwt.message
        });
    }

    if (!jwt.payload || !jwt.payload.id) {
        return res.status(401).json({
            message: "Invalid access_token payload."
        });
    }

    res.locals.id = jwt.payload.id;
    next();
}