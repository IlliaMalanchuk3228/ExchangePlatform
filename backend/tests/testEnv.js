exports.setupTestEnv = function() {
    // setup fastify server
    const { server } = require('../index');
    const pool = require('../database/connection');
    return [server, pool];
};