const express = require('express')
const app = express()
const sharp = require("sharp");
const multer  = require('multer');
const upload = require('./multerimage');
const fs= require('fs');
app.use("/uploadImage", express.static(__dirname + '/uploadImage'));
const port = 3000

app.get('/', (req, res) => {
    res.status(200).send('welcome to image conversion');

});

app.post('/upload',upload.single('image'),async (req, res,next) => {
    try {
           const { height,width }=req.body;
           const height1=parseInt(height);
           const width1=parseInt(width);
           
        
        if(req.file.mimetype=='image/jpeg'){
        await sharp(req.file.path).toFormat("png").png().resize(height1,width1).toFile(req.file.originalname, (err, resizeImage) => {
            if (err) {
               console.log(err); 
            } else {
                console.log(resizeImage);
            }
        }) }
        if(req.file.mimetype==='image/png'){
           await sharp(req.file.path).toFormat("jpeg").jpeg({ quality: 90 }).resize(height1,width1).toFile('uploadImage/' + req.file.originalname, (err, resizeImage) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(resizeImage);
                }
            }) }
        return res.status(201).json({
            message: 'File uploded successfully',
            
        });
    } catch (error) {
        console.error(error);
    }
});

app.get('/image',(req,res)=>{
    
async function ls(path) {
    const img=[];
    const dir = await fs.promises.opendir('uploadImage')
    for await (const dirent of dir) {
      //console.log(dirent.name)
      img.push(`http://localhost:3000/uploadImage/${dirent.name}`);
    }
    res.json({status:200, images:img});
  }
  
  ls('.').catch(console.error)
})


app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));