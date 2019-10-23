var { createBasicSQLString } = require('./features/support/dbConnection/createSQLString')
var { executeSQL } = require('./features/support/dbConnection/execute');


// function executeSQlSumary(sql) {
//     executeSQL(sql)
//         .then(async function (data) {
//             console.log(data);
//             var arrTmp = await data.rows[0];
//             return [
//                 arrTmp[0],
//                 arrTmp[4] ? arrTmp[4] : 0,
//                 arrTmp[5] ? arrTmp[5] : 0,
//                 arrTmp[6] ? arrTmp[6] : 0
//             ] 
//         })
//         .catch(function (err) {
//             console.log(err)
//             return []
//         })
// }

// function executeSQlDetail_summary(sql) {
//     executeSQL(sql)
//         .then(async function (data) {
//             console.log(data);
//             return [
//                 data.rows.length,
//                 data.rows.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue[7]), 0),
//                 data.rows.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue[8]), 0),
//                 data.rows.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue[9]), 0)
//             ]
//         })
//         .catch(err => console.log(err))
// }

function convertInput(string) {
    return `('${string.split(',').join("','")}')`
}

async function compare2SQL(inputSaleCom, inputBranchOffice, inputDepartment, inputCustomer) {
    var select1 = await [
        "imfr_sd_insert_id AS insert_id",
        "imfr_ud_sales_com AS sales_com",
        "imfr_ud_branch_office AS branch_office",
        "imfr_ud_customer AS customer",
        "imfr_ud_journal_date AS journal_date",
        "imfr_ud_application_key AS application_key",
        "imfr_ud_customer_nm AS customer_nm",
        "imfr_ud_uncollected AS uncollected",
        "imfr_ud_overpayment AS overpayment",
        "imfr_ud_amount_of_money AS amount_of_money",
        "imfr_ud_qa AS qa",
        "imfr_ud_product_cd AS product_cd",
        "imfr_ud_product_name AS product_name"
    ]

    var select2 = await [
        "COUNT(imfr_ud_sales_com) AS sales_com_count",
        "COUNT(imfr_ud_branch_office) AS branch_office_count",
        "COUNT(imfr_ud_department) AS department_count",
        "COUNT(imfr_ud_customer) AS customer_count",
        "SUM(imfr_ud_uncollected) AS uncollected_total",
        "SUM(imfr_ud_overpayment) AS overpayment_total",
        "SUM(imfr_ud_amount_of_money) AS amount_of_money_total"
    ]

    var table = await 'imfr_ut_sf_nim008_apl001'

    var saleComCondition = await `imfr_ud_sales_com IN ${convertInput(inputSaleCom)}`;
    var branchCondition = await inputBranchOffice.length > 0 ? `AND imfr_ud_branch_office IN ${convertInput(inputBranchOffice)}` : '';
    var departmentCondition = await inputDepartment.length > 0 ? `AND imfr_ud_department IN ${convertInput(inputDepartment)}` : '';
    var customerCondition = await inputCustomer.length > 0 ? `AND imfr_ud_customer IN ${convertInput(inputCustomer)}` : ''

    var sql1 = await createBasicSQLString(
        select1,
        table,
        [saleComCondition, branchCondition, departmentCondition, customerCondition]
    );

    var sql2 = await createBasicSQLString(
        select2,
        table,
        [saleComCondition, branchCondition, departmentCondition, customerCondition]
    );

    var rs1 = await [],
        rs2 = await [];

    await executeSQL(sql1)
        .then(async function (data) {
            // await console.log(data);
            // await console.log([
            //     data.rows.length,
            //     data.rows.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue[7]), 0),
            //     data.rows.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue[8]), 0),
            //     data.rows.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue[9]), 0)
            // ]);
            rs1 = await [
                data.rows.length,
                data.rows.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue[7]), 0),
                data.rows.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue[8]), 0),
                data.rows.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue[9]), 0)
            ];
        })
        .catch(err => console.log(err))

    await executeSQL(sql2)
        .then(async function (data) {
            // await console.log(data);
            var arrTmp = await data.rows[0];
            // await console.log([
            //     arrTmp[0],
            //     arrTmp[4] ? arrTmp[4] : 0,
            //     arrTmp[5] ? arrTmp[5] : 0,
            //     arrTmp[6] ? arrTmp[6] : 0
            // ]);
            rs2 = await [
                arrTmp[0],
                arrTmp[4] ? arrTmp[4] : 0,
                arrTmp[5] ? arrTmp[5] : 0,
                arrTmp[6] ? arrTmp[6] : 0
            ];
        })
        .catch(err => console.log(err))
        
    return await JSON.stringify(rs1) === JSON.stringify(rs2)
}

async function connect() {
    var a = await compare2SQL(
        '26,45,47,55,58,3,13,17,28,48,50,6,11,12,18,21,16,19,20,22,29,31,33,44,49,206 福島,8,10,25,32,36,39,42,43,51,54,56,5,7,14,15,37,38,46,52,201 青森,101 北海道,9,24,27,40,41,53,57,2,4,23,30,34,35',
        '3,販売事業本部（北海道）－北海道支社,販売事業本部（福島）－福島支社,9',
        '管理部,2060217,2060216',
        'PTV test 2060216'
    );
    await console.log(a);

}

connect()