const express = require('express');
const qrController = require('../controllers/qrController');

const router = express.Router();

router.get('/generateQrcode', qrController.generateQrCode);
router.post('/checkqrcode', qrController.checkQrCode);



module.exports = router;