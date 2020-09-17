var sharp = require('sharp');
const fs = require('fs');

module.exports = {
    execute: async (input, output) => {
        if(!fs.existsSync(output))fs.mkdirSync(output)
        sharp(input).toFormat("jpeg").jpeg({ quality: 90 }).toFile(`${output}/${Date.now()}.jpeg`)
    }
}