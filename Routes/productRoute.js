const express = require("express");
const {
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteSingleProduct,
  createProduct,
} = require("../controllers/productController");
const router = express.Router();
//get all product
router.get("/", getAllProduct);

//get single product
router.get("/:id", getSingleProduct);

// update product
router.put("/:id", updateProduct);

//remove single product
router.delete("/:id", deleteSingleProduct);

//create product
router.post("/", createProduct);

module.exports = router;
