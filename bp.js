const fs = require('fs');
const util = require('util');

module.exports = {
    process: function(systolic, diastolic, hb, weight) {
        let date = new Date();
        fs.appendFileSync('bp.txt',
            util.format("%d/%d/%d %d:%d:%d, %d, %d, %d, %d\r\n",
             date.getMonth() + 1, date.getDate(), date.getFullYear(),
             date.getHours(), date.getMinutes(), date.getSeconds(), 
             systolic, diastolic, hb, weight),
            'utf8');
    }
}

