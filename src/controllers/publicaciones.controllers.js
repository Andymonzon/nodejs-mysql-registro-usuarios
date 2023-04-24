exports.publicacionPost = (req,res) => {
    const {publicacion} = req.body;

    req.getConnection((err,conn) => {
        conn.query('INSERT INTO publication SET ?', { publication: publicacion, created_by:req.session.user, reply: 0 }, (err,rows) => {
            req.session.userComment = rows.insertId
            res.redirect('/publicaciones')
        });
    })
}

exports.comentarioPost = (req,res) => {
    const {comentario} = req.body
    req.getConnection((err,conn) => {
        conn.query('INSERT INTO publication SET ?', { publication: comentario, created_by:req.session.user, reply: req.session.userComment }, (err,rows) => {
            res.redirect('/publicaciones')
        });
    })
}