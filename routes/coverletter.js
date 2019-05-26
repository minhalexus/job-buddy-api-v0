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

router.post('/', async(req, res) =>{
    console.log("****************");
    console.log(req.body.name);
    console.log("*******************");

    let coverletter = new db({
        name: "Minhal Shanjer",
        position: "Mean Stack Developer",
        address: "166 Auburn Drive"
    });

    coverletter = await coverletter.save();
    res.send("Data received");
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




module.exports = router;