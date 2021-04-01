var express = require('express');
var router = express.Router();
const { signup, getAllProducts, signin } = require('../controller/auth');

router.post('/signup', signup);

router.get('/allproducts', getAllProducts);

router.post('/signin', signin);

module.exports = router;
