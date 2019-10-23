const { Calculator } = require('../../middleware/class/calculator');

var calculator = new Calculator();


exports.setNum = function (num1, num2) {
    calculator.setNum1(num1).setNum2(num2)
}

exports.result = function () {
    return calculator.result()
};

// var number1 = 0;
// var number2 = 0;

// exports.setNum = function (num1, num2) {
//     number1 = num1;
//     number2 = num2;
// }

// exports.result = function () {
//     return (number1 + number2)
// }