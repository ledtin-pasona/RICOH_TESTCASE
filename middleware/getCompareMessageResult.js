const { readFile, writefile } = require('../features/support/file');
const { getScenario } = require('./getScenarioInfo');
const fileCompare = './middleware/compare.json'

exports.newCompareMessageResult = function () {
    writefile(fileCompare, JSON.stringify({}));
}

exports.addCompareMessageResult = async function (actual, expected) {
    var scenario = await getScenario();

    var tmp = await {
        testCaseName: scenario.case,
        actual: actual,
        expected: expected,
        result: (actual == expected)
    }

    await readFile(fileCompare)
        .then(data => {
            var fileData = JSON.parse(data)
            try {
                var arrCompareTmp = fileData[scenario.tag];
                fileData[scenario.tag] = [...arrCompareTmp, tmp];
                writefile(fileCompare, JSON.stringify(fileData));
            } catch (e) {
                var tmpObj = Object.assign({}, fileData)
                fileData = { ...tmpObj, [scenario.tag]: [tmp] }
                writefile(fileCompare, JSON.stringify(fileData));
            }
        })
}

exports.getCompareMessageResult = async function () {
    var rs = await {}
    await readFile(fileCompare)
        .then(data => {
            var fileData = JSON.parse(data)
            rs = fileData;
        })
        .catch(err => { console.log(err) })
    return rs;
}