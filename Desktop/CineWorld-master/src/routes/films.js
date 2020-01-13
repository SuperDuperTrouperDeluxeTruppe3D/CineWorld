const multer = require("multer");
const {film} = require('../controllers/Controller.js');
let chosenFilm;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads'); // null->when error
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);  // new Date().toISOString() +  in windows does not work with date
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimeType === "image/jpeg" || file.mimeType === "image/png") {
        cb(null, true); //accept
    } else {
        cb(null, false);  // reject a file
    }
};

const upload = multer(
    {
        storage: storage,
        limits: {
            fileSize: 1024 * 1024 * 5
        }
        //   ,  fileFilter: fileFilter // does not work
    });

module.exports.routes = (app) => {

    app.get('/films', (req, res) => {
        film.preview(req, res);
    })
        .get('/films/:filmId', (req, res) => {
            film.renderFilmInfos(req, res);
        })

        .post("/films", upload.single("filmImage"), (req, res) => {
            film.addFilm(req, res);
        })

        .post('/films/:filmId', (req, res) => {

        })

        .patch('/films/:filmId', (req, res) => {
            film.update(req, res);
        })

        .delete('/films/:filmId', (req, res) => {
            film.deleteFilm(req, res);
        })
        .get("/films/:filmId/booking/:bookId", (req, res) => {
            //console.log(req.params)
        });
};


