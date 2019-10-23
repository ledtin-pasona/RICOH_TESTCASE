const fs = require('fs')

exports.readFile = function (filepath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, 'utf8', (error, res) => {
            if (error) {
                reject(error)
            } else {
                resolve(res)
            }
        })
    })
}

exports.writefile = function (filepath, data) {
    
    return new Promise((resolve, reject) => {
        fs.writeFile(filepath, data, 'utf8', (error, res) => {
            if (error) {
                reject(error)
            } else {
                resolve('write file ok!')
            }
        })
    })
}