const Products = require("../Models/productModel");
const asyncHandler = require('express-async-handler')
const getAllProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Products.find({});
    res.status(200).json(product);
  } catch (error) {
    res.status(500)
    throw new Error(error.message)
  }
});
const getSingleProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Products.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500)
    throw new Error(error.message)
  }
});
const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Products.findByIdAndUpdate(id, req.body);
    if (!product) { 
        res.status(404)
        throw new Error(`can't not find any product ${id}`)
    }
    const updateProduct = await Products.findByIdAndUpdate(id, req.body);
    res.status(200).json(updateProduct);
  } catch (error) {
    res.status(500)
    throw new Error(error.message)
  }
});
const deleteSingleProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Products.findByIdAndDelete(id);
    if (!product) {
      res.status(404)
      throw new Error(`can't not find any product ${id}`)
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500)
    throw new Error(error.message)
  }
});
const createProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Products.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500)
    throw new Error(error.message)
  }
});
module.exports = {
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteSingleProduct,
  createProduct,
};
