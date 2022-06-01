const pool = require('./backend/database/connection');
const { v4 } = require('uuid');

class Order {
    static async getAll() {
        const sql = 'SELECT * FROM "Orders"';
        const rows = await pool.query(sql);
        return rows.rows;
    }

    static async getById(orderId) {
        const sql = `SELECT * FROM "Orders" WHERE id = '${orderId}'`;
        const result = await pool.query(sql);
        return result.rows;
    }

    static async add(sellerId, buyerId, orderId, type, sellerBalance, newBalance, game) {
        const args = [v4(), sellerId, buyerId, orderId, type];
        const sql =
            'INSERT INTO "Orders"(id, sellerid, buyerid, orderid,\
 type) VALUES ($1, $2, $3, $4, $5)';
        await pool.query(sql, args);
        const sqlUpdateBalance = 'UPDATE "Users" SET balance = $1, inventory = array_append(inventory, $2) WHERE id = $3';
        const argsUpdateBalance = [newBalance, game, buyerId]
        await pool.query(sqlUpdateBalance, argsUpdateBalance);
        const sqlUpdateSellerBalance = 'UPDATE "Users" SET balance = $1 WHERE id = $2';
        const argsUpdateSellerBalance = [sellerBalance, sellerId]
        await pool.query(sqlUpdateSellerBalance, argsUpdateSellerBalance);
        return 'success';
    }

    static async delete(orderId) {
        const sql = `DELETE FROM "Orders" WHERE id = '${orderId}'`;
        await pool.query(sql);
        return 'success';
    }
}

module.exports = Order;
