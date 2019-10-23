var fs = require('fs');
const { BeforeAll, Before, After, AfterAll, setDefaultTimeout } = require('cucumber');
const { driver } = require('./web_driver');
const { newCompare, result } = require('./compareMessage')
const { logTestResult } = require('../../middleware/logTestResult');
const { logTestError } = require('../../middleware/logTestError')
const { getScenario } = require('../../middleware/getScenarioInfo')
const { addTestResult } = require('../../middleware/getTestResult')

setDefaultTimeout(60 * 1000);

function TestResult(testCaseName, duration, testStatus, screenShot, saveFileStatus, totalError) {
    this.testCaseName = testCaseName;
    this.duration = duration;
    this.testStatus = testStatus;
    this.screenShot = screenShot;
    this.saveFileStatus = saveFileStatus;
    this.totalError = totalError | 0;
}

var arrayTestResult = [];
var tmpTestResult = new TestResult();

function TestError(type, error) {
    this.type = type;
    this.error = error;
}

var tmpTestError = new TestError();
var objTestErr = {}
var tmpScenario = {}

BeforeAll(async function () {
    await console.log(`==========> START TEST <==========
    `);
    await setTimeout(() => {
        driver.manage().window().maximize();
    }, 2000);
    // await require('fs').rmdirSync('reports/reportImgs/*/')
    // deleteFolderRecursive('reports/reportImgs/')
    // const directory = 'reports/reportImgs/*';
});

Before(async function (scenario) {
    await newCompare;
    tmpTestResult = await new TestResult();
    await console.log(`----- START TEST CASE -----`);
});

After(async function (scenario) {
    tmpScenario = await getScenario();
    var folder = await tmpScenario.tag;
    var testcase = await tmpScenario.case;
    tmpTestResult.testCaseName = await testcase;

    let screenshot = await driver.takeScreenshot();
    await savefile(testcase, `reports/reportImgs/${folder}`, `${testcase}.png`, screenshot)
        .then(res => tmpTestResult.saveFileStatus = res)
        .catch(err => tmpTestResult.saveFileStatus = err);

    await console.log(`Test case name: ${testcase}.
    -> duration: ${scenario.result.duration} ms.
    -> status: ${scenario.result.status}.`);
    await console.log(`----- END TEST CASE  -----
    `);

    tmpTestResult.duration = await scenario.result.duration;
    tmpTestResult.testStatus = await scenario.result.status.toUpperCase();
    tmpTestResult.screenShot = await `reports/reportImgs/${folder}/${testcase}.png`;
    await arrayTestResult.push(tmpTestResult);
    await addTestResult(tmpTestResult);

    if (scenario.result.status == 'failed') {
        tmpTestError = await new TestError('test failed', scenario.result.exception)
        await setError(testcase, tmpTestError)
    }
});

AfterAll(async function () {
    await console.log(`
==========> END TEST <==========`);
    await logTestResult();
    await logTestError(objTestErr);
    // await driver.manage().deleteAllCookies();
    // return await driver.quit();
})

function savefile(testCaseName, dir, fileName, data) {
    return new Promise((resolve, reject) => {
        try {
            if (!require('fs').existsSync(dir)) {
                require('fs').mkdirSync(dir);
                require('fs').writeFile(`${dir}/${fileName}`, data, 'base64', function (err) {
                    if (err) {
                        tmpTestError = new TestError('save file', err);
                        setError(testCaseName, tmpTestError);
                        resolve("FAILED");
                    } else {
                        resolve("PASSED");
                    }
                });
            } else {
                require('fs').writeFile(`${dir}/${fileName}`, data, 'base64', function (err) {
                    if (err) {
                        tmpTestError = new TestError('save file', err);
                        setError(testCaseName, tmpTestError);
                        resolve("FAILED");
                    } else {
                        resolve("PASSED");
                    }
                });
            }

        } catch (error) {
            tmpTestError = new TestError('save file', error);
            setError(testCaseName, tmpTestError);
            reject("FAILED");
        }
    });
}

async function setError(testCaseName, error) {
    tmpTestResult.totalError += 1;
    try {
        var arrErrTmp = await objTestErr[testCaseName];
        objTestErr[testCaseName] = await [...arrErrTmp, error]
    } catch (e) {
        var tmpObj = await Object.assign({}, objTestErr)
        objTestErr = await { ...tmpObj, [testCaseName]: [error] }
    }
}

var deleteFolderRecursive = function (path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file, index) {
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};