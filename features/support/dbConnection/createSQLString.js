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
exports.createBasicSQLString = async function (arraySelectColumns, tableName, arrayWhereConditions) {
    var selectColumns = arraySelectColumns.filter(word => word.length > 0);
    var whereConditions = arrayWhereConditions.filter(word => word.length > 0);
    var select = await `SELECT ${selectColumns && selectColumns.length > 0 ? selectColumns.join(',') : '*'}`;
    var where = await `${whereConditions && whereConditions.length > 0 ? `WHERE ${whereConditions.length == 1 ? whereConditions.join('') : whereConditions.join(' ')}` : ''}`
    return `${select} FROM ${tableName} ${where}`.trim();
}