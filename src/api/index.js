const express = require('express');

const urlController = require('./url.controller');
const fileController = require('./file.controller');

const router = express.Router();

router.use(express.json());

router.post('/url-preview', urlController.urlPreview);
router.post('/file-preview', fileController.filePreview);

module.exports = router;
