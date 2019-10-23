'use strict'
const { Then } = require('cucumber');
const { result } = require('../support/calculator')

Then(/^get total$/, async function () {
    var res = result()
    return await console.log(res);
});