import jwt from 'jsonwebtoken';

const auth = ({ req }) => {
    const token = req.headers['x-auth-token'];
    let decoded = null;

    if (!token) return {
        user: null
    };

    try {
        decoded = jwt.verify(token, 'myJwtSecret');

        return {
            user: decoded
        }
    }
    catch(err) {
        return {
            user: null
        }
    }
};

export default auth;
