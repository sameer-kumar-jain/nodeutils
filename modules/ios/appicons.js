var sharp = require('sharp');
const fs = require('fs');
const sizes = [
    { w: 20 },
    { w: 29 },
    { w: 32 },
    { w: 40 },
    { w: 50 },
    { w: 57 },
    { w: 58 },
    { w: 60 },
    { w: 64 },
    { w: 72 },
    { w: 76 },
    { w: 80 },
    { w: 87 },
    { w: 100 },
    { w: 114 },
    { w: 120 },
    { w: 128 },
    { w: 144 },
    { w: 152 },
    { w: 167 },
    { w: 180 },
    { w: 256 },
    { w: 512 },
    { w: 1024 }
]
module.exports = {
    execute: async (input, output) => {
        if(!fs.existsSync(output))fs.mkdirSync(output)
        await Promise.all(sizes.map(item => {
            sharp(input).resize({ width: item.w }).toFile(`${output}/${item.w}.png`)
        }))
    }
}
