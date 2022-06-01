const schemes = require('./schemes');
const { getAll, getOrderById, addOrder, deleteOrder } = require('./controller');

module.exports = function (fastify, opts, done) {
    // get all rows from table Orders
    fastify.get('/order', { schema: schemes.getAll }, getAll);

    // get order by id
    fastify.get('/order/:id', { schema: schemes.getOrderById }, getOrderById);
    // add new order
    fastify.post(
        '/order/create',
        {
            schema: schemes.addOrder,
            preValidation: [fastify.tokenValidation],
        },
        addOrder
    );
    // delete order
    fastify.delete(
        '/order/:id',
        {
            schema: schemes.deleteOrder,
            preValidation: [fastify.tokenValidation],
        },
        deleteOrder
    );
    done();
};
