const fs = require('fs');
const util = require('util');

module.exports = {
    process: function(BP) {
        let date = new Date();
        fs.appendFileSync('bp.txt',
            util.format("%d/%d/%d %d:%d:%d, %d, %d, %d, %d\r\n",
             date.getMonth() + 1, date.getDate(), date.getFullYear(),
             date.getHours(), date.getMinutes(), date.getSeconds(), 
             BP.Systolic, BP.Diastolic, BP.HB, BP.Weight),
            'utf8');
    }
}

