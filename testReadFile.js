var fs = require("fs");
const { writefile } = require('./features/support/file')
const { choices } = require('./features/test/testConfig.json')

// writefile("./features/features/test.feature", "");
// choices.forEach(element => {
//     fs.readFile(element, 'utf8', (error, res) => {
//         if (error) {
//             console.log(error);
//         } else {
//             console.log(res);
//             fs.appendFile("./features/features/test.feature", res, 'utf8' , function () { })
//         }
//     })
// });

fs.readdir("./features/features", (err, files) => {
    files.forEach(file => {
        console.log(file);
    });
});

