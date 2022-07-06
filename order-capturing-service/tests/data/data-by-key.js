const fs = require('fs');
const path = require('path');

const root = path.resolve('tests/data');
const data = {};
function walk(dir) {
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            /* Recurse into a subdirectory */
            walk(file);
        } else { 
            if (file.endsWith('.json')) {
                data[file.replace(root + '/', '')] = require(file);
            }
        }
    });
}

walk(root);

module.exports = data;