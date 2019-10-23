'use strict'
const { Then } = require('cucumber');
const { findElement } = require('../support/findElement');

Then(/^click "([^"]*)" "([^"]*)"$/, async function (elementType, element) {
    return await findElement(element).click();
});