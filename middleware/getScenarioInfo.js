const { readFile, writefile } = require('../features/support/file');
const fileScenario = './middleware/scenario.json';

exports.getScenario = async function () {
    var sc = {}
    await readFile(fileScenario)
        .then(res => sc = JSON.parse(res))
        .catch(a => console.log(a))
    return await sc
};

exports.setScenario = function (tag, testCase) {
    var data = JSON.stringify({
        tag: tag,
        case: testCase
    })

    writefile(fileScenario, data)
        .then(res => console.log(res))
        .catch(a => console.log(a))
}