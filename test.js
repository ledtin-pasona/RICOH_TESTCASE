const fs = require('fs')
const shell = require('shelljs');
const { newCompareMessageResult, getCompareMessageResult } = require('./middleware/getCompareMessageResult');
const { newTestResult } = require('./middleware/getTestResult');
const testCaseArr = require('./features/test/testConfig.json').features;

const { writefile } = require('./features/support/file')
const { choices } = require('./features/test/testConfig.json')

const filePackageJSONPath = './package.json';
const testScript = 'testtin';
const cucumberCMD = './node_modules/.bin/cucumber-js.cmd';
const reportFormat = '--format json:./reports/report.json'

function readFile(filepath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, 'utf8', (error, data) => {
            if (error) {
                reject(error)
            } else {
                resolve(data)
            }
        })
    })
}

function pareStringToJSON(data) {
    return new Promise((resolve, reject) => {
        try {
            var json = JSON.parse(data);
            resolve(json)
        } catch (error) {
            reject(error)
        }
    })
}

function replaceScriptTest(json, tag) {
    return new Promise((resolve, reject) => {
        try {
            json.scripts[testScript] = replace(tag)
            resolve(json)
        } catch (error) {
            reject(error)
        }
    })
}

function replace(tag) {
    return `${cucumberCMD} --tags ${tag} ${reportFormat}`
}

function rewritefile(filepath, json) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filepath, JSON.stringify(json), 'utf8', (error, data) => {
            if (error) {
                reject(error)
            } else {
                resolve(data)
            }
        })
    })
}

function exe() {
    shell.exec(`npm run ${testScript}`)
}

async function setUpTestFeature() {
    await writefile("./features/features/test.feature", "");
    await fs.appendFileSync("./features/features/test.feature", "@Test" + "\n");
    await fs.appendFileSync("./features/features/test.feature", "Feature: Test examples" + "\n\n");
    await choices.forEach(element => {
        fs.readFileSync(element).toString().split('\n').filter((_, i) => i > 0).forEach(function (line) { 
            fs.appendFileSync("./features/features/test.feature", line.toString() + "\n", 'utf8', function () { });
        });
    });
}

async function runTest(tag) {
    await console.log(tag);
    await readFile(filePackageJSONPath)
        .then(data =>
            pareStringToJSON(data)
                .then(json =>
                    replaceScriptTest(json, tag)
                        .then(json =>
                            rewritefile(filePackageJSONPath, json)
                                .then(rs => exe())
                                .catch(err => console.log(err))
                        )
                        .catch(err => console.log(err))
                )
                .catch(err => console.log(err))
        )
        .catch(err => console.log(err))
}

async function run() {
    await newTestResult()
    await newCompareMessageResult();
    await setUpTestFeature();
    for (var i = 0; i < testCaseArr.length; i++) {
        await runTest(testCaseArr[i])
    }
    // var compareResult = await getCompareMessageResult();
    // await console.log(compareResult);

}

run();