var oracledb = require('oracledb');
var dbConfig = require('../../test/testConfig.json').database;

function connectString(host, port, serviceName) {
    return `(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=${host})(PORT=${port}))(CONNECT_DATA=(SERVICE_NAME=${serviceName})(SERVER=DEDICATED)))`
}

exports.openDBConnect = function () {
    return new Promise((resolve, reject) => {
        oracledb.getConnection({
            user: dbConfig.user,
            password: dbConfig.password,
            connectString: connectString(dbConfig.host, dbConfig.port, dbConfig.serviceName)
        },
            function (err, connection) {
                if (err) {
                    console.error('Open DB connect error', err.message)
                    reject(err.message);
                } else {
                    console.log('Connection was open successful!');
                    resolve(connection);
                }
            }
        );
    })
}

exports.closeDBConnect = function (connection) {
    return connection.close(function (err) {
        if (err) {
            console.error('Close DB connect error: ', err.message);
        } else {
            console.log('Connection was close successful!');
        }
    });
}