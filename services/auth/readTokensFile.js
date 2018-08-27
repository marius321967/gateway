const fs = require('fs');
const filename = './tokens/tokens.json';

module.exports = () => {
    const rawFile = fs.readFileSync(filename);
    return JSON.parse(rawFile);
}