const express = require('express');
const router = express.Router();
const Publicaciones = require('../models/publicaciones')
router.get('/', async(req, res) => {
    try{
        const posts = await Publicaciones.find({})
        res.render('index',{posts});
    }
    catch(err){
        console.log(err);
    }
})
router.get('/about',(req, res) => {
    let nombre = 'Lucia'
    res.render('about',{nombre});
})

module.exports = router;