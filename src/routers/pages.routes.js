const express = require('express');
const pages = require('../controllers/pages.controllers');
const auth = require('../controllers/auth.controllers');
const publicacionesController = require('../controllers/publicaciones.controllers');

const router = express.Router();

router.get('/', pages.getHomePage);
router.get('/login', pages.getLoginPage);
router.post('/login', auth.authLogin);
router.get('/register', pages.getRegisterPage);
router.post('/register', auth.authRegister);
router.get('/logout', auth.logout);
router.get('/publicaciones', pages.getPublicationPage);
router.post('/publicaciones', publicacionesController.publicacionPost);

module.exports = router;