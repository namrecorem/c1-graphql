import jwt from 'jsonwebtoken';
import { PubSub } from 'apollo-server';

const context = ({ req, connection }) => {
    const pubsub = new PubSub();

    let token;

    if (connection) {
        token = connection.context.authorization;
    }
    else {
        token = req.headers['x-auth-token']; 
    }

    // No token
    if (!token) return {
        pubsub,
        user: null
    };

    // Verify token
    try {
        const decoded = jwt.verify(token, 'myJwtSecret');

        return {
            pubsub,
            user: decoded
        }
    }
    catch(err) {
        return {
            pubsub,
            user: null
        }
    }
};

export default context;
