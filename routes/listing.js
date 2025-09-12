const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const { listingSchema, reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const listingController = require("../controller/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");

const upload = multer({ storage });
//Index Route

router.route("/").get(wrapAsync(listingController.index)).post(
  isLoggedIn,
  upload.single("listing[image]"),
  validateListing,

  wrapAsync(listingController.createListing)
);

// .post(
//   isLoggedIn,
//   validateListing,
//   wrapAsync(listingController.createListing)
// );
// .post(upload.single("listing[image]"), (req, res) => {
//   console.log(req.file);
//   res.send(req.file);
// });

// New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//Update and  Show route
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,

  wrapAsync(listingController.renderEditForm)
);

module.exports = router;

// router.get("/", wrapAsync(listingController.index));

// Show Route
// router.get("/:id", wrapAsync(listingController.showListing));

// Create Route
// router.post(
//   "/",
//   isLoggedIn,
//   validateListing,
//   wrapAsync(listingController.createListing)

//   if(!req.body.listing){ throw new ExpressError(400,"Send valid Data to create a listing");}
//   if(!newListing.title || !newListing.description || !newListing.price || !newListing.location || !newListing.country){
//     throw new ExpressError(400,"All fields are required");
//   }

//   Joi Validation

//   let result= listingSchema.validate(req.body);
//   console.log(result);

//   if(result.error){
//     throw new ExpressError(400,result.error);
//   }
// );

// Edit Route
// router.get(
//   "/:id/edit",
//   isLoggedIn,
//   isOwner,
//   wrapAsync(listingController.renderEditForm)
// );

// Update Route
// router.put(
//   "/:id",
//   isLoggedIn,
//   isOwner,
//   validateListing,
//   wrapAsync(listingController.updateListing)
// );

// Delete Route
// router.delete(
//   "/:id",
//   isLoggedIn,
//   isOwner,
//   wrapAsync(listingController.deleteListing)
// );
