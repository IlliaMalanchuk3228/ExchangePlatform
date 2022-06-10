/* eslint-disable no-undef */
const { v4 } = require('uuid');
const jwt = require('jsonwebtoken');
const { setupTestEnv } = require('./testEnv');
const Game = require('../services/game/model');
require('dotenv').config();
const [fastify, pool] = setupTestEnv();

let token = null;
describe('Testing game', () => {
    beforeEach(async () => {
        token = jwt.sign({ id: 'test', username: 'test' }, process.env.SECRET, {
            expiresIn: '12h',
        });
    });

    afterAll(async () => {
        // delete all test data
        const sql = `DELETE FROM "Games" WHERE
 title LIKE 'test%'`;
        await pool.query(sql);
        await fastify.close();
        await pool.end();
    });

    test('it should add a new game to the database', async () => {
        // prepare test data
        const inputData = {
            steamprice: 100,
            title: 'test title',
            steamlink: 'test url',
            imagelink: 'test image link',
            description: 'test description',
        };

        // send request
        const response = await fastify.inject({
            url: '/game',
            method: 'POST',
            headers: {
                'content-Type': 'application/json',
                authorization: `Bearer ${token}`,
            },
            payload: JSON.stringify(inputData),
        });
        // check data
        expect(response.statusCode).toBe(200);
        expect(response.body).toBe('success');
    });

    test('it should throw an error "Bad request",\
 testing add game', async () => {
        // prepare test data
        const inputData = {
            steamprice: 100,
            title: 'test title',
            steamlink: 'test url',
            imagelink: 'test image link',
        };

        // send request
        const response = await fastify.inject({
            url: '/game',
            method: 'POST',
            headers: {
                'content-Type': 'application/json',
                authorization: `Bearer ${token}`,
            },
            payload: JSON.stringify(inputData),
        });
        // check data
        expect(response.statusCode).toBe(400);
    });

    test('it should get 2 page with 12 games from the database', async () => {
        // add 26 games into the DB
        for (let i = 0; i < 26; i++) {
            const gameId = v4();
            const args = [
                gameId,
                100 + i,
                `test title № ${i}`,
                'test url',
                'test image link',
                'test description',
            ];
            const sqlInsert =
                'INSERT INTO "Games"(gameid, steamprice, title,\
        steamlink, imagelink, description) VALUES ($1, $2, $3, $4, $5, $6)';
            await pool.query(sqlInsert, args);
        }
        const expectedData = await Game.getAll(2);

        // send request
        const response = await fastify.inject({
            url: '/game/page?page=2',
            method: 'GET',
        });
        // check data
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body)[0].title).toBe(expectedData[0].title);
    });

    test('it should get game by id', async () => {
        // prepare test data
        const expectedData = await Game.getById('2');
        // send request
        const response = await fastify.inject({
            url: '/game/2',
            method: 'GET',
        });

        // check data
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body).title).toBe(expectedData.title);
    });

    test('it should return empty list', async () => {
        // send request
        const response = await fastify.inject({
            url: '/game/000000',
            method: 'GET',
        });

        // check data
        expect(response.statusCode).toBe(200);
        expect(response.body).toBe('[]');
    });

    test('it should update game description in the database', async () => {
        // add test game
        const gameId = v4();
        const args = [
            gameId,
            100,
            'test title',
            'test url',
            'test image link',
            'test description for update',
        ];
        const sqlInsert =
            'INSERT INTO "Games"(gameid, steamprice, title,\
        steamlink, imagelink, description) VALUES ($1, $2, $3, $4, $5, $6)';
        await pool.query(sqlInsert, args);

        // prepare test data
        const inputData = {
            fields: [{ description: 'changed description' }],
        };

        // send request
        const response = await fastify.inject({
            url: `/game/${gameId}`,
            method: 'PUT',
            headers: {
                'content-Type': 'application/json',
                authorization: `Bearer ${token}`,
            },
            payload: JSON.stringify(inputData),
        });

        // check data
        expect(response.statusCode).toBe(200);
        expect(response.body).toBe('success');
    });

    test('it should delete game from the database', async () => {
        // add test game
        const gameId = v4();
        const args = [
            gameId,
            100,
            'test title',
            'test url',
            'test image link',
            'test description for deleting',
        ];
        const sqlInsert =
            'INSERT INTO "Games"(gameid, steamprice, title,\
     steamlink, imagelink, description) VALUES ($1, $2, $3, $4, $5, $6)';
        await pool.query(sqlInsert, args);

        // send request
        const response = await fastify.inject({
            url: `/game/${gameId}`,
            method: 'DELETE',
            headers: {
                'content-Type': 'application/json',
                authorization: `Bearer ${token}`,
            },
        });

        // check data
        expect(response.statusCode).toBe(200);
        expect(response.body).toBe('success');
    });
});