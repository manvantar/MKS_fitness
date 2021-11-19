//const { genSaltSync, hashSync } = require("bcrypt");
const bcrypt = require('bcrypt');

//const salt = genSaltSync(10);
//let password = hashSync("n@@nU2897", salt);
//console.log(password);

let result=(bcrypt.compareSync('trupti123', "$2b$10$pcKmXznTiEoobIDYllPLk.CjcD3UsQSTtisqXrrTT7EGUW5vn8u4K"))? "Passwords match":"Passwords mismatch";
let result2=bcrypt.getRounds("$2b$10$YTjJyT0wrbtZgufNLziw/OmZXuPBkKlhBeBPekvW5rl8oIuK7TD.2");
console.log(result+" "+result2);