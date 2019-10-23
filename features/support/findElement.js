'use strict'
const { objectsRespository } = require('../objectsRepository');
const { waitting } = require('./waitting');

exports.findElement = function (element) {
    var tmpObject = {};

    for (var ent of Object.entries(objectsRespository)) {
        if (ent[0] == element) {
            tmpObject = ent[1];
        }
    }

    return waitting(tmpObject);
}