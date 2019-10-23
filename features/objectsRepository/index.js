'use strict'
const { errorMessage } = require('./errorMessage');
const { txtUsername } = require('./Login/txtUsername');
const { txtPassword } = require('./Login/txtPassword');
const { btnLogin } = require('./Login/btnLogin');
const { btnGoToImportApp } = require('./btnGoToImportApp');
const { chbMoM } = require('./ImportScreen/chbMoM');
const { btnApply } = require('./ImportScreen/btnApply');
const { txtMoM } = require('./ImportScreen/txtMoM');
const { txtTankaTekiyoDateDisplay } = require('./ImportScreen/txtTankaTekiyoDateDisplay');
const { elmSaturday } = require('./ImportScreen/elmSaturday')
const { elmSunday } = require('./ImportScreen/elmSunday')
const { btnTab2 } = require('./nim008_apl001_tab2/btnTab2')
const { btnSaleCom } = require('./nim008_apl001_tab2/btnSaleCom')

exports.objectsRespository = {
    errorMessage,
    txtUsername, txtPassword, btnLogin,
    btnGoToImportApp,
    chbMoM, btnApply, txtMoM, txtTankaTekiyoDateDisplay, elmSaturday, elmSunday,
    btnTab2, btnSaleCom
}