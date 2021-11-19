'use strict';

const fs = require('fs');

let rawdata = fs.readFileSync('test.json');
let student = JSON.parse(rawdata);
console.log(student.Data1);
