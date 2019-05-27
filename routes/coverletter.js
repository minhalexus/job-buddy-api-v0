const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const db = mongoose.model('CoverLetter', new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    position:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    }
}));

router.get('/', async (req, res) =>{
    res.format({
        'text/html': async () => {
            const coverletters = await db.find();
            res.send(coverletters);
        },
        'default': function(){
            res.send('Not Acceptable ');
        }
    });
});


router.post('/:id/download', async(req, res) => {
    var path = require('path');
    res.sendFile(path.resolve(`pdfs/${req.params.id}.pdf`)); // Set disposition and send it.
});



router.post('/', async(req, res) =>{
    console.log("****************");
    console.log(req.body.name);
    console.log("*******************");

    let coverletter = new db({
        name: req.body.name,
        position: req.body.position,
        address: req.body.address
    });

    coverletter = await coverletter.save();

    if (coverletter){
        generatePDF(coverletter);
        res.send(coverletter);
    }
    else{
        res.status(404).send("Could not post properly.");
    }
    
});

router.put('/:id', async(req,res) =>{
    // Logic
    console.log("****************");
    console.log(req.body.name);
    console.log(req.params.id);
    console.log("*******************");

    const coverletter = await db.findByIdAndUpdate
    (
        req.params.id, 
        { name: req.body.name },
        { new: true }
    )

    //if (!temp) return res.status(404).send('ID not found');

    res.send(coverletter);
    //response
});

router.delete('/:id', async(req,res) =>{
    console.log("*****************");
    console.log('Deleting ', req.params.id);
    console.log(req.body);
    console.log('********************')

    const coverletter = await db.findByIdAndDelete(req.params.id);

    if (coverletter){
        res.send('Deleted')
    }
    else{
        res.status(404).send('Could not delete');
    }
});

router.get('/:id', async(req,res) =>{
    console.log('****************');
    console.log('getting ', req.params.id);
    console.log("********************");

    const coverletter = await db.findById(req.params.id);

    if (coverletter){
        res.send('Found it!');
    }
    else{
        res.status(404).send('Could not find the id');
    }
});


const generatePDF = (coverletter) => {
    var fonts = {
        Roboto: {
            normal: './fonts/Roboto-Regular.ttf',
            bold: './fonts/Roboto-Medium.ttf',
            italics: './fonts/Roboto-Italic.ttf',
            bolditalics: './fonts/Roboto-MediumItalic.ttf'
        }
    };
    
    var PdfPrinter = require('pdfmake');
    var printer = new PdfPrinter(fonts);
    var fs = require('fs');
    
    var docDefinition = {
        content: [
            `${coverletter.id}`,
            `${coverletter.name}`,
            `${coverletter.position}`,
            `${coverletter.address}`,
        ]
    };
    
    var pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(fs.createWriteStream(`pdfs/${coverletter.id}.pdf`));
    pdfDoc.end();
}



module.exports = router;