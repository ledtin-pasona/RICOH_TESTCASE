'use strict'
const { When } = require('cucumber');
const { findElement } = require('../support/findElement');

When(/^input textbox "([^"]*)" value "([^"]*)"$/, async function (textbox, value) {
    return await findElement(textbox).sendKeys(value);
});
