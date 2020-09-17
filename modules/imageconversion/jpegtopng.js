var sharp = require('sharp');
const fs = require('fs');

module.exports = {
    execute: async (input, output) => {
        if(!fs.existsSync(output))fs.mkdirSync(output)
         sharp(input).toFormat("png").png().toFile(`${output}/${Date.now()}.png`)
    }
}