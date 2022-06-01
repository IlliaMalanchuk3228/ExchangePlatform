const schemes = require('./schemes');
const {
    getAll,
    getByGame,
    getOfferById,
    getByUser,
    addOffer,
    deleteOffer,
} = require('./controller');

module.exports = function(fastify, opts, done) {
    // get all rows from table Offers
    fastify.get('/offer', { schema: schemes.getAll }, getAll);

    fastify.get('/offer/byGame/:gameId', getByGame);
    fastify.get('/offer/byUser/:userId', getByUser);
    // get offer by id
    fastify.get(
        '/offer/:orderId',
        { schema: schemes.getOfferById },
        getOfferById
    );
    // add new offer
    fastify.post(
        '/offer/create',
        {
            schema: schemes.addOffer,
            preValidation: [fastify.tokenValidation],
        },
        addOffer
    );
    // delete offer
    fastify.post(
        '/offer/:orderId',
        {
            preValidation: [fastify.tokenValidation],
        },
        deleteOffer
    );
    done();
};
