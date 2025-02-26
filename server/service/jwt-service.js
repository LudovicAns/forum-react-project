import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.USER_AUTH_SECRET_KEY
const EXPIRES_IN = parseInt(process.env.USER_AUTH_EXPIRES_IN)
const EXPIRES_IN_REMEMBER = parseInt(process.env.USER_AUTH_EXPIRES_IN_REMEMBER)

export default {
    sign: (payload, options) => {
        const { rememberMe } = options;

        const expiresIn = rememberMe ? EXPIRES_IN_REMEMBER : EXPIRES_IN;

        return jwt.sign(payload, SECRET_KEY, { expiresIn: expiresIn });
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