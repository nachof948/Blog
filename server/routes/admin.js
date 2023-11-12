const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuarios')
const Publicaciones = require('../models/publicaciones')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const jswSecret = process.env.JWT_SECRET

//FUNCIONES MIDLEWARE
const accesoMiddle = (req, res, next)=>{
    const token = req.cookies.usuario
    if(!token){
        return res.status(401).json({message:'No estas autorizado'})
    }
    try{
        const decodificar = jwt.verify(token,jswSecret)
        req.userId = decodificar.userId 
        next()
    }catch(err){
        console.log(err)
    }
}


router.get('/add-post',(req, res) => {
    res.render('admin/add-post')
})

/* LOGIN */
router.get('/login',(req, res) => {
    res.render('admin/index')
})
router.post('/login', async(req, res) => {
    const {usuario, password} = req.body
    try{
        const cliente = await Usuario.findOne({usuario})
        if(!cliente){
            return res.status(401).json({message:'informacion invalida'})
        }
        /* Buscar la contraseña */
        const validoPassword = await bcrypt.compare(password, cliente.password)
        if(!validoPassword){
            return res.status(401).json({message:'informacion invalida'})
        }
        const token = jwt.sign({userId: cliente._id},jswSecret)/* CIFRADO y AGREGAMOS LA LLAVE */
        res.cookie('usuario',token,{httpOnly:true})
        res.render('admin/dashboard',{cliente})
    }catch(error){
        console.log(error)
    }
})



/* REGISTRO */
router.get('/register',(req, res) => {
    res.render('admin/index')
})

router.post('/register', async(req, res) => {
    const {username, password} = req.body

    const hashedPassword = await bcrypt.hash(password,10)
    try{
        const usuario = await Usuario.create({username, password: hashedPassword})
        console.log(usuario)
        //res.status(200).json({messsage: 'Se creo la publicacion', publicacion})
        res.redirect('/')
    }
    catch(error){
        if(error.code === 11000)
        console.log("Ese usuario ya esta en uso")
    }


})

router.post('/add-post', async(req, res) => {
    const {titulo, texto} = req.body
    try{
        const publicacion = await Publicaciones.create({titulo, texto})
        //res.status(200).json({messsage: 'Se creo la publicacion', publicacion})
        res.redirect('/')
    }
    catch(err){
        res.status(404).json({messsage: 'No se pudo la publicacion'})
    }
})


router.get('/dashboard', accesoMiddle, (req, res) => {
    res.render('admin/dashboard',{cliente}) 
})


router.get('/logout',(req,res)=>{
    res.clearCookie('usuario')
    res.redirect('/')
})


/* router.post('/admin',async(req, res) => {
    const {username, password} = req.body
    try{
        const user = await Usuario.create({username, password})
        
    }
    catch(error){
        
    }
}) */


module.exports = router;