var { openDBConnect, closeDBConnect } = require('./setup');

exports.executeSQL = function (query) {
    return new Promise((resolve, reject) => {
        openDBConnect()
            .then(connection => {
                connection
                    .execute(query)
                    .then(data => {
                        resolve(data);
                        closeDBConnect(connection);
                    })
                    .catch(err => {
                        reject(err);
                        closeDBConnect(connection);
                    })    
            })
            .catch(err => reject(err))
    })
}