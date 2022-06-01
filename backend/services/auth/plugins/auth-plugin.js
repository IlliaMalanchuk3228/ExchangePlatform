const fp = require('fastify-plugin');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = fp(async (fastify) => {

    fastify.decorate('tokenValidation', async (request, reply) => {
        if (request.method === 'OPTIONS') {
            reply.send('Auth failed');
        }
        let token;
        try {
            //Authorization bearer token
            token = request.headers.authorization.split(' ')[1];
            if (!token) {
                reply.send('invalid token');
            }
            const decodedToken = jwt.verify(token, process.env.SECRET);

            request.userData = { userId: decodedToken._id };
        } catch (err) {
            reply.send('invalid token');
        }
    });
});
