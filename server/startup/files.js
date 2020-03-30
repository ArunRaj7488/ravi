const router = require('express').Router();

const multer = require('multer');
const upload = multer();

const {
uploadFiles
} = require('../route/uploadfile');

router.post('/files',upload.array('uploadFiles'), uploadFiles)

module.exports = router;