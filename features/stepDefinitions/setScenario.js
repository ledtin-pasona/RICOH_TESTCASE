'use strict'
const { Given } = require('cucumber');
const { setScenario } = require('../../middleware/getScenarioInfo');

Given(/^set scenario: { tag: "([^"]*)", testcase: "([^"]*)" }$/, async function (tag, testcase) {
    setScenario(tag, testcase)
});
