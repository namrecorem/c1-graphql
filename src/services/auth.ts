import { ApolloError } from "apollo-server-errors";
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
        throw new ApolloError('Invalid token');
    }
};

export default auth;
