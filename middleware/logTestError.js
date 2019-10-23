exports.logTestError = async function (objTestErr) {
    await console.log(`
==========> LOG TEST ERROR <==========`);
    if (Object.entries(objTestErr).length == 0) {
        console.log("====> No error! Good job!");
    } else {
        for (var [key, value] of Object.entries(objTestErr)) {
            console.log("");
            console.group(`====> LOG ERROR OF TEST CASE: ${key}`);
            console.log("");
            var totalErr = 0;
            for (let index = 0; index < value.length; index++) {
                const element = value[index];
                console.log("No: ", index + 1);
                console.log("TYPE: ", element.type);
                console.log("ERROR: ", element.error);
                console.log("");
                totalErr++;
            }
            console.groupEnd();
            console.log(`====> END LOG ERROR OF TEST CASE: ${key}. Total error: ${totalErr}.`);
            console.log("");
        }
    }
    await console.log(`==========> END LOG TEST ERROR <==========`);
}