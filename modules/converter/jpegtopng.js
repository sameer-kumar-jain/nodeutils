var sharp = require('sharp');
const fs = require('fs');

module.exports = {
    execute: async (data) => {
        if(!fs.existsSync(data.output))fs.mkdirSync(data.output)
         sharp(data.input).toFormat("png").png().toFile(`${data.output}/${Date.now()}.png`)
    }
}