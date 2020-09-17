const fs = require('fs')
const { createCanvas } = require('canvas')
var ios = require('./ios/appicons')
var android = require('./ios/appicons')
var pngtojpeg = require('./imageconversion/pngtojpeg')
var jpegtopng = require('./imageconversion/jpegtopng')

module.exports = {
    execute: async ({ colors, text, textSize, textColor, output, platforms }) => {
        const width = 1024;
        const height = 1024;

        const canvas = createCanvas(width, height)
        const context = canvas.getContext('2d');
        //Create background
        var grd = context.createLinearGradient(width / 2, 0, width / 2, height);
        grd.addColorStop(0, colors[0]);
        grd.addColorStop(1, colors[1])
        context.fillStyle = grd
        context.fillRect(0, 0, width, height);
        //write text
        context.textAlign = 'center'
        context.textBaseline = 'top'
        context.fillStyle = textColor
        context.font = `${textSize}px bold`;

        context.fillText(text, width / 2, height / 2 - textSize / 2)

        const buffer = canvas.toBuffer('image/png')
        fs.writeFileSync('./image.png', buffer);;
        await Promise.all(platforms.map(async platform => {
            switch (platform) {
                case "ios":
                    await ios.execute('./image.png', output);
                case "android":
                    await android.execute('./image.png', output);
                case "jpegtopng":
                        await jpegtopng.execute('./image.jpeg',output);
                        break;
               case "pngtojpeg":
                        await pngtojpeg.execute('./image.png', output);
                    
                
            }
        }))

        //fs.unlinkSync('./image.png')
    }
}  