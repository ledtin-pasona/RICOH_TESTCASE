class CompareMessage {
    constructor() {
        this.result = []
    }

    addCompare(testcaseName, actual, expected) {
        var tmp = {
            testcaseName: testcaseName,
            actual: actual,
            expected: expected,
            result: (actual == expected)
        }

        this.result.push(tmp);
    }

    getResult() {
        return this.result
    }
}

var compare = new CompareMessage();

exports.newCompare = function () {
    compare = new CompareMessage();
};

exports.addCompare = function (testcaseName, actual, expected) {
    compare.addCompare(testcaseName, actual, expected);
}

exports.result = compare.getResult();

// var resultCompareObj = {};

// exports.newCompare = function () {
//     resultCompare = {};
// }

// exports.addCompare = async function (testcaseName, actual, expected) {
//     var tmp = await {
//         actual: actual,
//         expected: expected,
//         result: (actual == expected)
//     }

//     try {
//         var arrCompareTmp = await resultCompareObj[testcaseName];
//         resultCompareObj[testcaseName] = [...arrCompareTmp, tmp]
//     } catch (e) {
//         var tmpObj = await Object.assign({}, resultCompareObj)
//         resultCompareObj = await { ...tmpObj, [testcaseName]: [tmp] }
//     }
// }


// exports.result = resultCompareObj;
