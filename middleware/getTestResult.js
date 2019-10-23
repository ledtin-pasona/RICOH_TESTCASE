const { readFile, writefile } = require('../features/support/file');
const { getScenario } = require('./getScenarioInfo');
const fileResult = './middleware/result.json'

exports.newTestResult = function () {
    writefile(fileResult, JSON.stringify({}));
}

exports.addTestResult = async function (objTestResult) {
    var scenario = await getScenario();

    // var tmp = await {
    //     testCaseName: scenario.case,
    //     actual: actual,
    //     expected: expected,
    //     result: (actual == expected)
    // }

    await readFile(fileResult)
        .then(data => {
            var fileData = JSON.parse(data)
            try {
                var arrCompareTmp = fileData[scenario.tag];
                fileData[scenario.tag] = [...arrCompareTmp, objTestResult];
                writefile(fileResult, JSON.stringify(fileData));
            } catch (e) {
                var tmpObj = Object.assign({}, fileData)
                fileData = { ...tmpObj, [scenario.tag]: [objTestResult] }
                writefile(fileResult, JSON.stringify(fileData));
            }
        })
}

exports.getTestResult = async function () {
    var rs = await {}
    await readFile(fileResult)
        .then(data => {
            var fileData = JSON.parse(data)
            rs = fileData;
        })
        .catch(err => { console.log(err) })
    return rs;
}