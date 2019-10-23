exports.isEqual = function (object1, object2) {
    if (Object.prototype.toString().call(object1) !== Object.prototype.toString().call(object2)) {
        return false
    }
    return JSON.stringify(object1) === JSON.stringify(object2)
}