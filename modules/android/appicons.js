var sharp = require('sharp');
const fs = require('fs');
const sizes = [
    { w: 72, drawable:'mipmap-hdpi' },
    { w: 48, drawable:'mipmap-mdpi' },
    { w: 96, drawable:'mipmap-xhdpi' },
    { w: 144, drawable:'mipmap-xxhdpi' },
    { w: 192, drawable:'mipmap-xxxhdpi' }
]
module.exports = {
    execute: async (input, output) => {
        if(!fs.existsSync(output))fs.mkdirSync(output)
        await Promise.all(sizes.map(item => {
            if(!fs.existsSync(`${output}/${item.drawable}`))fs.mkdirSync(`${output}/${item.drawable}`);
            sharp(input).resize({ width: item.w }).toFile(`${output}/${item.drawable}/ic_launcher.png`)
        }))
    }
}
