const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../user/user-model');

exports.login = async (req, reply) => {
    try {
        console.log(req.user.id);
        let user = await User.findBySteamId(req.user.id);

        if (!user) {
            user = new User(
                req.user.displayName,
                req.user.id,
                req.user.photos[2].value
            );
            await user.save();
        }
        console.log(user);
        const token = jwt.sign({ id: user.id, username: user.steamUsername },
            process.env.SECRET, {
                expiresIn: '12h',
            });
        console.log({
            id: user.id,
            username: user.steam_name,
            jwtToken: token,
            clientUrl: process.env.FRONT_URL
        });
        return reply.view('success', {
            id: user.id,
            username: user.steam_name,
            jwtToken: token,
            clientUrl: process.env.FRONT_URL
        });
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};
