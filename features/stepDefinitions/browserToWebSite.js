'use strict'
const { Given } = require('cucumber');
const { driver } = require('../support/web_driver');

Given(/^browse to web site "([^"]*)"$/, async function (url) {
    // await console.log(document.readyState);

    // await driver.wait(document.readyState == 'complete',
    //     9999999999,
    //     `TIME OUT! Please try again!`)
    return driver.get(url);
});
