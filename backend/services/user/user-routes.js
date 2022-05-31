const {
    getAll, getById, getAccount, update
} = require('./user-controller');

module.exports = async function(fastify) {
    fastify.route({
        method: 'GET',
        url: '/users/',
        preValidation: [fastify.tokenValidation],
        handler: getAll,
    });
    fastify.route({
        method: 'GET',
        url: '/myaccount/:userId',
        preValidation: [fastify.tokenValidation],
        handler: getAccount,
    });

    fastify.route({
        method: 'PUT',
        url: '/myaccount/:userId',
        preValidation: [fastify.tokenValidation],
        handler: update,
    });

};

