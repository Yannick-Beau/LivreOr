const connectionDB = require('../config/dataBase');
const moment = require('../config/moment');

class Message {

    constructor (row) {
        this.row = row;
    }

    get message () {
        return this.row.message;
    }

    get created_at () {
        return moment(this.row.created_at);
    }

    static create (content, cb) {
        connectionDB.query(
            'INSERT INTO message SET message = ?, created_at = ?',
            [
                content,
                new Date(),
            ],
            (err, result) => {
                if (err) throw err;
                cb(result);
            });
    }

    static findAll (cb) {
        connectionDB.query(
            'SELECT * FROM message',
            (err, rows) => {
                if (err) throw err;
                cb(rows.map((row) => new Message(row)));
            });
    }

}

module.exports = Message;