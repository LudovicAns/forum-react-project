import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.USER_AUTH_SECRET_KEY
const EXPIRES_IN = process.env.USER_AUTH_EXPIRES_IN

export default {
    sign: (payload) => {
        return jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRES_IN });
    },
    verify: (token) => {
        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            return {success: true, payload: decoded}
        } catch (error) {
            switch (error.name) {
                case 'TokenExpiredError':
                    return {success: false, message: 'Token expired'}
                default:
                    return {success: false, message: 'Invalid token'}
            }
        }
    }
}