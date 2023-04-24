const mysql = require('mysql2');
const { PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT } = require('../config')
const db = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    database: DB_DATABASE
})

exports.getHomePage = (req,res) => {
    if(req.session.loggedin === true){
        res.render('home' , { name: req.session.name })
    }else{
        res.redirect('/login')
    }
};

exports.getLoginPage = (req,res) => {
    if(req.session.loggedin !== true){
        res.render('login/index')
    }else{
        res.redirect('/')
    }
};

exports.getRegisterPage = (req,res) => {
    if(req.session.loggedin !== true){
        res.render('login/register')
    }else{
        res.redirect('/')
    }
};

exports.getPublicationPage = (req,res) => {
    if(req.session.loggedin === true){
        db.query('SELECT u.id, u.name, p.publication FROM users u INNER JOIN publication p ON u.id = p.created_by AND p.reply = 0 order by p.id desc', (err, results) => {
            let dataPublication = results
            res.render('publicaciones' , { name: req.session.name, publicaciones: dataPublication})
        })
    }else{
        res.redirect('/login')
    }
};