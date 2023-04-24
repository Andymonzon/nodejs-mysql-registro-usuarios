const bcrypt = require('bcryptjs')

exports.authRegister= (req,res) =>{ 
    const data = req.body;
    const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    req.getConnection((err,conn) => {
        conn.query('SELECT email FROM users WHERE email = ?', [data.email], (err,userData) => {
            if(userData.length > 0){
                res.render('login/register', { error: 'El usuario ya existe' });
            }else if(data.password !== data.confirmPassword){
                res.render('login/register', { error: 'Las contraseñas no coinciden' });
            }else if(data.password === '' || data.confirmPassword === ''){
                res.render('login/register', { error: 'Complete los campos' });
            }else if(data.name === '' || data.email === ''){
                res.render('login/register', { error: 'Complete los campos' });
            }else if(!emailRegex.test(data.email)){
                res.render('login/register', { error: 'Ingrese un mail valido' });
            }else if(data.password.length < 8){
                res.render('login/register', { error: 'La contraseña debe tener mas de 8 caracteres' });
            }else{
                conn.query('SELECT name FROM users WHERE name = ?', [data.name],(err,nameData) => {
                    if(nameData.length > 0){
                        return res.render('login/register', { error: 'El nombre ya existe' })
                    }else{
                        bcrypt.hash(data.password, 12).then(hash => {
                            data.password = hash;
                            data.confirmPassword = hash;
                            req.getConnection((err,conn) => {
                                conn.query('INSERT INTO users SET ?', {name:data.name,email:data.email,password:data.password}, (err,rows) => {
                                    
                                    req.session.loggedin = true;
                                    req.session.name = data.name;
                                    req.session.user = rows.insertId

                                    res.redirect('/');
                                });
                            });
                        });
                    }
                })
            }
        });
    });
};

exports.authLogin = (req, res) => {
    req.getConnection((err,conn) => {
        conn.query('SELECT * FROM users WHERE email = ?', [req.body.email], (err,userData) => {
            if(userData.length > 0){
                userData.forEach(element => {
                    bcrypt.compare(req.body.password, element.password, (err,isMatch) => {
                        if(!isMatch){
                            res.render('login/index', { error: 'La contraseña es incorrecta' });
                        }else{
                            req.session.loggedin = true;
                            req.session.name = element.name;
                            req.session.user = element.id
                            res.redirect('/');
                        };
                    });
                });

            }else{
                res.render('login/index', { error: 'El usuario no existe' });
            }
        });
    });
};

exports.logout = (req,res) => {
    if(req.session.loggedin === true){
        req.session.destroy();
    }
    res.redirect('/login')
};