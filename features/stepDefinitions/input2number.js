'use strict'
const { When } = require('cucumber');
const { setNum } = require('../support/calculator')

When(/^add number 1 "([^"]*)" and number 2 "([^"]*)"$/, async function (number1, number2) {
    console.log(number1, number2);
    
    return await setNum(parseInt(number1, 10), parseInt(number2, 10));
    // return await findElement(textbox).sendKeys(value);
});
