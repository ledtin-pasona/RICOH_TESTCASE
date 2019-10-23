'use strict'
const { When } = require('cucumber');
const { findElement } = require('../support/findElement');

When(/^clear textbox "([^"]*)"$/, async function (textbox) {
    return await findElement(textbox).clear();
});


