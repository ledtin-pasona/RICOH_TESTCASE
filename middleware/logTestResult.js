const { getTestResult } = require('./getTestResult')
const { getCompareMessageResult } = require('./getCompareMessageResult');

exports.logTestResult = async function () {
    await console.log(`
    ==========> LOG TEST RESULT <==========`);
    var objTestResult = await getTestResult();
    for (var [key, value] of Object.entries(objTestResult)) {
        // await console.log(key);

        for (var i = 0; i < value.length; i++) {
            var res = value[i];
            await console.log("");
            await console.groupCollapsed((res.testStatus == 'PASSED' && res.saveFileStatus == 'PASSED') ? '\x1b[32m v' : '\x1b[31m x', 'Test case: ' + res.testCaseName);
            await console.log("\x1b[0m");
            await console.log(`----- Table summarize -----`);
            await console.table({
                "Tag": { value: key },
                "Testcase name": { value: res.testCaseName },
                "Duration": { value: res.duration },
                "Test status": { value: res.testStatus },
                "Screenshot": { value: res.screenShot },
                "Save-file status": { value: res.saveFileStatus },
                "Total error": { value: res.totalError }
            });

            var compareresult = await getCompareMessageResult()
            var tmp = await [];

            for (var [key1, value1] of Object.entries(compareresult)) {
                if (key == key1) {
                    tmp = await value1
                }
            }

            if (tmp.length > 0) {
                var tmpComapreRS = await tmp.filter(obj => obj.testCaseName === res.testCaseName);

                if (tmpComapreRS.length > 0) {
                    await console.log(`----- Compare result in test case -----`);
                    for (var j = 0; j < tmpComapreRS.length; j++) {
                        await console.group(`No: ${j + 1}.`)
                        await console.log(`Expected: ${tmpComapreRS[j].expected}`);
                        await console.log(`Actual: ${tmpComapreRS[j].actual}`);
                        await console.log(`Result: ${tmpComapreRS[j].result}`);
                        await console.groupEnd();
                    }
                }
            }

            await console.groupEnd();
            await console.log("");
        }
    }

    await console.log(`==========> END LOG TEST RESULT <==========`);
}