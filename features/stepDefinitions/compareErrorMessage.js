const { Given } = require('cucumber');
const { findElement } = require('../support/findElement');
const { addCompareMessageResult } = require('../../middleware/getCompareMessageResult');

Given(/^compare message in "([^"]*)" with "([^"]*)"$/, async function (element, message) {
    var text = await findElement(element).getText();
    return await addCompareMessageResult(text, message)
});