const { default: fastify } = require('fastify');
const Order = require('./model');
const Offer = require('../offer/model');
const User = require('../user/user-model');

exports.getAll = async function (request, reply) {
    try {
        const order = await Order.getAll();
        if (order.length < 1) {
            reply.send([]);
        }
        return reply.send(order);
    } catch (err) {
        throw new Error(`${err.message}\n${err.name}: \
        in line ${err.lineNumber}`);
    }
};

exports.getOrderById = async function (request, reply) {
    try {
        const { id } = request.params;
        const order = await Order.getById(id);
        if (!order) {
            return reply.send({ message: 'No order' });
        }
        return reply.send(order);
    } catch (err) {
        throw new Error(`${err.message}\n${err.name}: \
        in line ${err.lineNumber}`);
    }
};

exports.addOrder = async function (request, reply) {
    try {
        const { buyerid, orderid, type } = request.body;
        // get user's balance
        const user = await User.findById(buyerid);
        console.log({user});
        const balance = parseFloat(user.balance);
        console.log({balance})
        // get offer info
        const offer = await Offer.getById(orderid);
        let price = parseFloat(offer[0]['price']);
        // if seller and buyer is the same
        if(user.id === offer[0].creatorid){
            price = 0;
        }

        if (price < balance) {
            const sellerid = offer[0]['creatorid'];
            const sellerBalance = await User.findById(sellerid);
            const game = offer[0]['gameid'];
            const result = await Order.add(sellerid, buyerid, orderid, type, parseFloat(sellerBalance.balance) + price, balance - price, game);
            if (offer.length >= 1) await Offer.close(orderid, buyerid);
            return reply.send(result);
        } else {
            return reply.code(422).send('Not enough money on balance');
        }
    } catch (err) {
        console.log(err);
        throw new Error(`${err.message}\n${err.name}: \
        in line ${err.lineNumber}`);
    }
};

exports.deleteOrder = async function (request, reply) {
    try {
        const { id } = request.params;
        const result = await Order.delete(id);
        return reply.send(result);
    } catch (err) {
        throw new Error(`${err.message}\n${err.name}: \
        in line ${err.lineNumber}`);
    }
};
