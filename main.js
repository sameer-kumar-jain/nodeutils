var ios = require('./modules/ios/appicons')
var android = require('./modules/android/appicons')
var createIcon = require('./modules/create-image')
const fs = require('fs')

/**
 * IOS/Android
 * --APPICONS
 * --- input icon and output location
 * --- new background [gradient] and text
 * -- Splash Screens
 * --- input screen and output location
 * ---- new background gradient and text
 */
const options = [{ key: '-config', arg: 'config' }, { key: '-service', arg: 'service' }]
const execute = async (args) => {
    let params = {};
    args.map((arg, index) => {
        options.map(option => {
            if (option.key === arg) {
                params[option.arg] = args[index + 1];
            }
        })
    });
    let config = fs.readFileSync(params.config);
    switch (params.service) {
        case "create-new":
            return await createIcon.execute(JSON.parse(config));
        case "convert-icon-to-ios":
            return await ios.execute(JSON.parse(config));
        case "convert-icon-to-android":
            return await android.execute(JSON.parse(config));
        case "convert-png-to-jpeg":
            return await createIcon.execute(JSON.parse(config));
        case "convert-jpeg-to-png":
            return await createIcon.execute(JSON.parse(config));
        default:
            console.log('No service found')
    }


}
execute(process.argv.slice(2))