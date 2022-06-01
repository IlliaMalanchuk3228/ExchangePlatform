const pool = require('./backend/database/connection');
const { v4 } = require('uuid');

class Game {
    static async getAll(page = 1) {
        const sql = `SELECT * FROM "Games" ORDER BY gameid ASC\
 OFFSET ${12 * (page - 1)} LIMIT 12`;
        const rows = await pool.query(sql);
        return rows.rows;
    }

    static async getById(gameId) {
        const sql = `SELECT * FROM "Games" WHERE gameid = '${gameId}'`;
        const result = await pool.query(sql);
        return result.rows;
    }


    static async add(steamprice, title, steamlink, imagelink, description) {
        const args = [
            v4(),
            steamprice,
            title,
            steamlink,
            imagelink,
            description,
        ];
        const sql =
            'INSERT INTO "Games"(gameid, steamprice, title, steamlink, \
imagelink, description) VALUES ($1, $2, $3, $4, $5, $6)';
        await pool.query(sql, args);
        return 'success';
    }

    static async delete(gameId) {
        const sql = `DELETE FROM "Games" WHERE gameid = '${gameId}'`;
        await pool.query(sql);
        return 'success';
    }

    static async update(gameId, fields) {
        // create sql script
        let sql = 'UPDATE "Games" SET ';
        const formClause = Object.keys(fields).map(
            (key) => `${key} = \
'${fields[key]}'`
        );
        sql += formClause.join(', ');
        sql += ` WHERE gameid = '${gameId}'`;
        // execute script
        await pool.query(sql);
        return 'success';
    }
}

module.exports = Game;
