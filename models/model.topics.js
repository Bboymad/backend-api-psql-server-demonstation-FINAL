const db = require('../db/connection');

exports.selectTopics = () => {
    return db.query('SELECT * FROM topics;')
    .then(({rows}) => {
        if (rows.length > 0 ) {
            return rows
        }
    })
}