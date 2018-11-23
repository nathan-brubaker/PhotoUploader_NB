'use strict';

const fs = require('fs');
const storageDirectory = __dirname + '/../../storage/';

exports.getPhotoListing = (request, response) => {
    let batches = [];
    let photos;
    let directories;
    let files;
    let fileSize;

    directories = fs.readdirSync(storageDirectory);
    for (let batch in directories) {
        if(fs.lstatSync(storageDirectory + directories[batch]).isDirectory()){
            files = fs.readdirSync(storageDirectory + directories[batch]);
            photos = [];
            for (let photo in files) {
                fileSize = parseFloat((fs.statSync(storageDirectory + directories[batch] + '/' + files[photo]).size) / 1000000.0).toFixed(2);
                photos.push({'name': files[photo], 'size': fileSize + ' MB'});
            }

            batches.push({'name': directories[batch], 'photos': photos});
        }
    }

    response.json({success:true, batches:batches});
};

exports.savePhoto = (request, response) => {
    const form = new require('formidable').IncomingForm();

    form.parse(request, (err, fields, files) => {
        if(!fs.existsSync(storageDirectory + fields.batch)){
            fs.mkdirSync(storageDirectory + fields.batch);
        }

        fs.renameSync(files.file.path, storageDirectory + fields.batch + '/' + files.file.name);

        response.json({success:true, photo: {name:files.file.name, size: parseFloat(files.file.size / 1000000.0).toFixed(2) + 'MB'}});
    });
};