const User = require('./user-model');

exports.getAll = async (req, reply) => {
    try {
        const users = await User.getAll();
        if (!users) {
            reply.send([]);
        }
        return reply.send(users);
    } catch (err) {
        throw new Error('error');
    }
};

exports.getAccount = async (req, reply) => {
    const userId = req.params.userId;
    try {
        const user = await User.findById(userId);
        const inventory = await User.getInventory(userId);
        if (!user) {
            return [];
        }
        return reply.send({ user, inventory });
    } catch (err) {
        console.log(err);
        throw new Error('error');
    }
};

exports.update = async (req, reply) => {
    const userId = req.params.userId;
    const { trade_link } = req.body;
    try {
        await User.updateUser(userId, trade_link);

        return reply.send('success');
    } catch (err) {
        throw new Error('error');
    }
};

