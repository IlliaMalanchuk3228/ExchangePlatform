const fastifyPassport = require('fastify-passport');
const { login } = require('./auth-controller');


module.exports = async function(fastify) {
    fastify.get('/auth',
        fastifyPassport.authenticate('steam', { session: false })
    );
    fastify.route({
        method: 'GET',
        url: '/auth/return',
        preValidation:
            fastifyPassport.authenticate('steam', { session: false }),
        handler: login
    });
};
