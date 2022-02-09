const experss = require('express')
const router = experss.Router();
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const {isLoggedIn, isAuthor, validateCampground} = require('../middleware');
const campgrounds = require('../controllers/campgrounds')
const multer  = require('multer')
const{storage} = require('../cloudinary')
const upload = multer({storage})


//all the campgrounds, a list of campgrounds
router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image') ,validateCampground,catchAsync(campgrounds.createCampground))
    

    
    
    //create a new campgrounds
router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put( isLoggedIn, isAuthor, upload.array('image') ,validateCampground ,catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))



//edit campground
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))


module.exports = router;