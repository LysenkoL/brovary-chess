import fs from 'fs';
let data = fs.readFileSync('src/App.jsx', 'utf8');
data = data.replace(/"\/images\//g, '"./images/');
fs.writeFileSync('src/App.jsx', data);
