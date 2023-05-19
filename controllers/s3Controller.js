//This is just an example

const s3 = require('../middleware/s3');

const bucketName = 'newwedsinnodeserver';
const key = 'path/to/file';
const filePath = 'path/to/local/file';

s3.uploadFile(bucketName, key, filePath)
    .then((data) => {
        console.log(`File uploaded successfully. File location: ${data.Location}`);
    })
    .catch((err) => {
        console.error(err);
    });
