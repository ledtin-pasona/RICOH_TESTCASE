require('chromedriver');
require('geckodriver');
require('iedriver'); //add this package if you want to use it.
require('edgedriver');
require('selenium-webdriver/edge');

const webDriver = require('selenium-webdriver');
const browserConfig = require('../test/testConfig.json').browser;

//create WebDriver instance based on your browser config;
function createDriver() {
    let browser = browserConfig.toLowerCase();
    if (['chrome', 'firefox', 'ie', 'edge'].indexOf(browser) < 0) browser = 'chrome'; //default to chrome
    
    if(browserConfig.localeCompare('ie') == 0) {
        let capabilities = webDriver.Capabilities.ie();
        capabilities.set("ignoreProtectedModeSettings", true);
        capabilities.set("ignoreZoomSetting", true);
        capabilities.set("ignoreZoomSetting", true);
        return new webDriver.Builder().withCapabilities(capabilities).build();
    } else if(browserConfig.localeCompare('edge') == 0) {
        return new webDriver.Builder().forBrowser('edge').build();;
    } else {
        return new webDriver.Builder().forBrowser(browser).build();
    }
}

exports.driver = createDriver();