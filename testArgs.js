/**
 * @author ledtin
 * @param {Array<string>} arraySelectColumns
 * @param {string} tableName
 * @param {Array<string>} arrayWhereConditions
 * @description
 * (1) arraySelectColumns is array of select column look like ['id', 'name AS exampleName'] or [] or null;
 * (2) tableName is name of table select;
 * (3) arrayWhereConditions is array of where conditions, look like ['id >= 3', "AND name LIKE 'exp'", 'OR salary >= 100'].
 */
createBasicSQLString = async function (arraySelectColumns, tableName, arrayWhereConditions) {
    var selectColumns = arraySelectColumns.filter(word => word.length > 0);
    var whereConditions = arrayWhereConditions.filter(word => word.length > 0);
    var select = await `SELECT ${selectColumns && selectColumns.length > 0 ? selectColumns.join(',') : '*'}`;
    var where = await `${whereConditions && whereConditions.length > 0 ? `WHERE ${whereConditions.length == 1 ? whereConditions.join('') : whereConditions.join(' ')}` : ''}`
    console.log(`${select} FROM ${tableName} ${where}`.trim());
    
}

// createBasicSQLString([''], 'table', ['where 1','', 'AND where 2', 'OR where 3']);

function convertInput(string) {
    // var rs = '';
    // string.split(',').forEach(element => {
    //     rs += `'${element}',`
    // });
    console.log(`('${string.split(',').join("','")}')`);
    
    return `('${string.split(',').join("','")}')`
}

// convertInput('1,2,3,4')

function isEqual(object1, object2) {
    if (Object.prototype.toString().call(object1) !== Object.prototype.toString().call(object2)) {
        return false
    }
    return JSON.stringify(object1) === JSON.stringify(object2)
}
