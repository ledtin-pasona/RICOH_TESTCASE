class Calculator {
    constructor() {
        this.num1 = 0;
        this.num2 = 0;
    }

    setNum1(num) {
        this.num1 = num;
        return this;
    }

    setNum2(num) {
        this.num2 = num;
        return this;
    }

    result() {
        return this.num1 + this.num2;
    }
}

exports.Calculator = Calculator;