const express = require('express')
const router = express.Router({ mergeParams:true});
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const Review = require('../models/review');
const {validateReview, isLoggedIn, isReviewAuthor} = require('../middleware')
const reviews = require('../controllers/reviews')


//create a review for the camp
router.post('/', isLoggedIn ,validateReview ,catchAsync(reviews.createReviw))

//delete a review from the camp
router.delete('/:reviewId', isLoggedIn, isReviewAuthor,catchAsync(reviews.deleteReview))

module.exports = router;