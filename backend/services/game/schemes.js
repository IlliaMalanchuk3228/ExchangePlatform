const schemes = {};
// get
schemes.getAll = {
    querystring: {
        type: 'object',
        required: ['page'],
        properties: {
            page: { type: 'integer' },
        },
    },
    response: {
        200: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    gameid: { type: 'string' },
                    title: { type: 'string' },
                    steamprice: { type: 'number' },
                    steamlink: { type: 'string' },
                    imagelink: { type: 'string' },
                    description: { type: 'string' },
                },
            },
        },
    },
};
// get
schemes.getGameById = {
    response: {
        200: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    gameid: { type: 'string' },
                    title: { type: 'string' },
                    steamprice: { type: 'number' },
                    steamlink: { type: 'string' },
                    imagelink: { type: 'string' },
                    description: { type: 'string' },
                },
            },
        },
    },
};
// post
schemes.addGame = {
    body: {
        type: 'object',
        required: [
            'steamprice',
            'title',
            'steamlink',
            'imagelink',
            'description',
        ],
        properties: {
            steamprice: { type: 'number' },
            title: { type: 'string' },
            steamlink: { type: 'string' },
            imagelink: { type: 'string' },
            description: { type: 'string' },
        },
    },

    response: {
        200: {
            type: 'string',
        },
    },
};
// put
schemes.updateGame = {
    body: {
        type: 'object',
        required: ['fields'],
        properties: {
            fields: { type: 'array' },
        },
    },

    response: {
        200: {
            type: 'string',
        },
    },
};
//delete
schemes.deleteGame = {
    response: {
        200: {
            type: 'string',
        },
    },
};

module.exports = schemes;
