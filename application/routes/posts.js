var express = require('express');
var PostModel = require('../models/Posts')
var router = express.Router();
const { errorPrint, successPrint } = require('../helpers/debug/debugprinters');
const UserError = require('../helpers/error/UserError');
var sharp = require('sharp');
var multer = require('multer');
var crypto = require('crypto');
var PostError = require('../helpers/error/PostError');
const { response } = require('express');
const { query } = require('../conf/database');
const { EBADF } = require('constants');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images/upload");
    },
    filename: function (req, file, cb) {
        let fileExt = file.mimetype.split('/')[1];
        let randomName = crypto.randomBytes(22).toString("hex");
        cb(null, `${randomName}.${fileExt}`)
    }
});

var uploader = multer({ storage: storage });




router.post('/createPost', uploader.single("uploadImage"), (req, res, next) => {
    let fileUploaded = req.file.path;
    let fileAsThumbnail = `thumbnail-${req.file.filename}`;
    let destinationOfThumbnail = req.file.destination + "/" + fileAsThumbnail;
    let title = req.body.postName;
    let description = req.body.postDesc;
    let fk_userId = req.session.userId;

    /** do server validation make sure title and fk is not undefined*/

    if (title && fk_userId) {
        sharp(fileUploaded)                                     // creating the thumbnail
            .resize(200)
            .toFile(destinationOfThumbnail)
            .then(() => {
                return PostModel.create(title, description, fileUploaded, destinationOfThumbnail, fk_userId);
            })
            .then((postWasCreated) => {
                if (postWasCreated) {
                    req.flash('success', "Your post was created successfully");
                    res.json({ status: "OK", message: "post was created", redirect: "/" });
                    //res.redirect('/');
                } else {
                    res.json({ status: "Error", message: "post was not created", redirect: "/postimage" });
                    //throw new PostError('Post could not be created!!', '/postImage', 200)
                }
            })
            .catch((err) => {
                if (err instanceof PostError) {
                    errorPrint(err.getMessage());
                    req.flash('error', err.getMessage());
                    res.status(err.getStatus());
                    res.redirect(err.getRedirectURL());

                } else {
                    next(err);
                }
            })
    }
});

router.get('/search', async (req, res, next) => {
    let searchTerm = req.query.search;
    if (!searchTerm) {
        res.send({
            resultsStatus: "info",
            message: "No search term given",
            results: []
        });
    } else {
        let results = await PostModel.search(searchTerm);
        if (results.length) {
            res.send({
                resultsStatus: "info",
                message: `${results.length} results found`,
                results: results
            });
        }
        else {
            let results = await PostModel.getNRecentPosts(8);
            res.send({
                resultsStatus: "info",
                message: "No results were found, but here are the 8 most recent posts",
                results: results
            });
        }
    }
});

module.exports = router;