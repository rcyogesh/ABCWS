const fs = require('fs');

var words = [];
fs.readFile("textDB.txt", 'utf8', function(err, data){
    if(!err)
    {
        words = data.split("\n");
        for (var index = 0; index < words.length; index++) {
            words[index] = words[index].trim();
        }
    }
});

module.exports = {
    process: function(letter, response) {
        var subset = [];
        words.forEach(function(element) {
            if(element.startsWith(letter)) {
                subset.push(element);
            }
        }, this);
        var json = JSON.stringify(subset);
        response.write(json);
        response.end();
    }
}