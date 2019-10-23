const { driver } = require('./web_driver');
const webdriver = require('selenium-webdriver');
const until = webdriver.until;

exports.waitting = function (locator) {
    return driver.findElement(async function () {
        await driver.wait(
            until.elementLocated(locator),
            9999999999,
            `TIME OUT: More time to find element ${locator}! Please try again!`
        );
        return await driver.findElement(locator);

    });
}