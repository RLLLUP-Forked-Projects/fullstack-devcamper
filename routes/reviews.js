const express = require("express");
const router = express.Router({ mergeParams: true });

const Review = require("../models/Review");

// Middlewares
const advancedResults = require("../middlewares/advancedResults");
const { protect, authorize } = require("../middlewares/auth");
const checkOwnerShip = require("../middlewares/checkOwnership");

// Routes
const {
  addReview,
  getReviews,
  getReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviews");

// Route: /api/v1/bootcamps/:bootcampId/reviews
// Route: /api/v1/reviews
router
  .route("/")
  .get(
    advancedResults(Review, { path: "bootcamp", select: "name description" }),
    getReviews
  )
  .post(protect, authorize("admin", "user"), addReview);

// Route: /api/v1/reviews/:id
router
  .route("/:id")
  .get(getReview)
  .put(
    protect,
    authorize("admin", "user"),
    checkOwnerShip(Review),
    updateReview
  )
  .delete(
    protect,
    authorize("admin", "user"),
    checkOwnerShip(Review),
    deleteReview
  );

module.exports = router;