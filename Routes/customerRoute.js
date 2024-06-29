const express = require("express");
const {
  createCustomer,
  getAllCustomer,
  getSingleCustomer,
  deleteSingleCustomer,
  updateCustomer,
  insertProductForCustomer,
  deleteProductOfCustomer
} = require("../controllers/customerController");
const router = express.Router();
//create customer
router.post("/", createCustomer);
//get all customer
router.get("/", getAllCustomer);
//get single customer
router.get("/", getSingleCustomer);
//delete single customer
router.delete("/", deleteSingleCustomer);
//update customer
router.put("/", updateCustomer);
//insert product for customer
router.post("/products", insertProductForCustomer);
//delete product for customer
router.delete("/products", deleteProductOfCustomer);

module.exports = router;
