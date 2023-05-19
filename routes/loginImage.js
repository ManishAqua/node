const express = require('express');
const router = express.Router();
const s3 = require('../middlewares/s3');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const BUCKET_NAME = 'wedsinnode';

const loginImages = [
    { key: 'loginImage-0.jpg', status: 'pending' },
    { key: 'loginImage-1.jpg', status: 'pending' },
    { key: 'loginImage-2.jpg', status: 'pending' },
];

const s3BucketBaseUrl = 'https://wedsinnode.s3.ap-south-1.amazonaws.com/';

// Get all loginImages with status
router.get('/loginImages', async (req, res) => {
    const imageStatuses = loginImages.map((image) => ({ key: image.key, status: image.status, url: `${s3BucketBaseUrl}${image.key}` }));
    const response = {
        data: imageStatuses,
    };
    res.json(response);
});

// Configure multer for file upload
const upload = multer({ dest: 'uploads/' });

// Upload an image
router.post('/loginImages', upload.array('images', 3), async (req, res) => {
    try {
        const { files } = req;
        if (!files || files.length !== 3) {
            throw new Error('Please upload three files');
        }

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const { originalname, path: filePath } = file;
            const key = `${Date.now()}-${originalname}`;
            try {
                await s3.uploadFile(BUCKET_NAME, key, filePath);
                fs.unlinkSync(filePath);
                console.log(`File uploaded successfully. Key: ${key}`);
                loginImages[i].key = key;
                loginImages[i].status = 'uploaded';
            } catch (err) {
                console.log(`Error uploading file: ${err}`);
                res.status(500).send('Error uploading file');
                return;
            }
        }

        try {
            await s3.updateObject(BUCKET_NAME, 'loginImages.json', loginImages);
        } catch (err) {
            console.log(`Error updating image data: ${err}`);
            res.status(500).send('Error updating image data');
            return;
        }

        res.status(200).send('File(s) uploaded successfully');
    } catch (err) {
        console.log(`Error uploading file: ${err}`);
        res.status(500).send('Error uploading file');
    }
});

// Download an image
router.get('/loginImages/:key', async (req, res) => {
    const { key } = req.params;
    const downloadPath = path.join(__dirname, `../downloads/${key}`);
    try {
        await s3.downloadFile(BUCKET_NAME, key, downloadPath);
        console.log(`File downloaded successfully. Key: ${key}`);
    } catch (err) {
        console.log(`Error downloading file: ${err}`);
        res.status(500).send('Error downloading file');
        return;
    }
    res.sendFile(downloadPath);
});

// Update an image's status
router.put('/loginImages/:key', async (req, res) => {
    const { key } = req.params;
    const { status } = req.body;
    const imageIndex = loginImages.findIndex((image) => image.key === key);
    if (imageIndex === -1) {
        res.status(404).send('Image not found');
        return;
    }

    loginImages[imageIndex].status = status;

    try {
        await s3.updateObject(BUCKET_NAME, 'loginImages.json', loginImages);
    } catch (err) {
        console.log(`Error updating image data: ${err}`);
        res.status(500).send('Error updating image data');
        return;
    }

    res.status(200).send('Image status updated successfully');
});

// Delete an image
router.delete('/loginImages/:key', async (req, res) => {
    const { key } = req.params;
    const imageIndex = loginImages.findIndex((image) => image.key === key);
    if (imageIndex === -1) {
        res.status(404).send('Image not found');
        return;
    }

    try {
        await s3.deleteFile(BUCKET_NAME, key);
        console.log(`File deleted successfully. Key: ${key}`);
    } catch (err) {
        console.log(`Error deleting file: ${err}`);
        res.status(500).send('Error deleting file');
        return;
    }

    loginImages[imageIndex] = { key, status: 'deleted' };

    try {
        await s3.updateObject(BUCKET_NAME, 'loginImages.json', loginImages);
    } catch (err) {
        console.log(`Error updating image data: ${err}`);
        res.status(500).send('Error updating image data');
        return;
    }

    res.status(200).send('File deleted successfully');
});

module.exports = router;
