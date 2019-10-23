const { Given, When, Then } = require('cucumber');
const { driver } = require('../support/web_driver');
const webdriver = require('selenium-webdriver');
const until = webdriver.until;

const { objectsRespository } = require('../objectsRepository');

Then(/^delay "([^"]*)"s to find element "([^"]*)"$/, async function (delay, element) {
    var obj = await {};

    for (var ent of Object.entries(objectsRespository)) {
        if (ent[0] == element) {
            obj = ent[1];
        }
    }

    return await driver.wait(until.elementLocated(obj), Number.parseInt(delay, 10) * 1000);;
    
});