const qrcode = require('qrcode');
const qr = require('qr-image');
const Jimp = require('jimp');
const moment = require('moment');
const fs = require('fs');

// Generate QR code with current time
exports.generateQrCode = async (req, res) => {
    try {
        const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
        
        qrcode.toFile('qrCode.png', currentTime, {
            errorCorrectionLevel: 'H',
            type: 'image/png',
        }, (err) => {
            if (err) {  
                console.error('Error generating QR code:', err);
                res.status(500).json({ error: 'Error generating QR code' });
            } else {
                console.log('QR code generated with current time:', currentTime);
                res.status(200).json({ message: 'QR code generated with current time', currentTime });
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

// Check QR code
exports.checkQrCode = async (req, res) => {
    try {

        const { qrTime } = req.body;
        
        const currentTime = moment();
        const decodedTime = moment(qrTime, 'YYYY-MM-DD HH:mm:ss');
        const timeDifference = currentTime.diff(decodedTime, 'hours');
        const payment = 30 + ((timeDifference-1)*20);


        console.log('QR Code Time:', qrTime);
        console.log('Current Time:', currentTime.format('YYYY-MM-DD HH:mm:ss'));
        console.log('Time Difference (seconds):', timeDifference);
        console.log('Payment:', payment);

        res.status(200).json({ message: `Total time: ${timeDifference} hours, so total bill: Rs. ${payment}`});

    }
    catch (error) {
        console.error('Error checking QR code:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};
