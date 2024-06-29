const Customers = require("../Models/customerModel");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const createCustomer = asyncHandler(async (req, res) => {
  try {
    const customer = await Customers.create(req.body);
    res.status(200).json(customer);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const getAllCustomer = asyncHandler(async (req, res) => {
  try {
    const customer = await Customers.find({});
    res.status(200).json(customer);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const getSingleCustomer = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;
    const customer = await Customers.findById(id);
    res.status(200).json(customer);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const deleteSingleCustomer = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;
    const customer = await Customers.findByIdAndDelete(id);
    if (!customer) {
      res.status(404);
      throw new Error(`can't not find any customer ${id}`);
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const updateCustomer = asyncHandler(async (req, res) => {
  try {
    const { id, age } = req.body;
    const customer = await Customers.findByIdAndUpdate(id, age);
    if (!customer) {
      res.status(404);
      throw new Error(`can't not find any customer ${id}`);
    }
    const updateCustomer = await Customers.findByIdAndUpdate(id, req.body);
    res.status(200).json(updateCustomer);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const insertProductForCustomer = asyncHandler(async (req, res) => {
  try {
    const { id, productId } = req.body;
    const customer = await Customers.findById(id);
    // console.log(typeof product_id);
    if (customer) {
      const existingProduct = customer.purchase.find((item) => {
      //  console.log(item.productId.toString());
        return item.productId.toString() === productId;
      });

      console.log(existingProduct);
      if (existingProduct) {
        await Customers.updateOne(
          { _id: id, "purchase.productId": productId },
          { $inc: { "purchase.$.quantity": 1 } }
        );
      } else {
        await Customers.updateOne(
          { _id: id },
          { $push: { purchase: { productId: productId, quantity: 1 } } }
        );
      }
      const updateCustomer = await Customers.findById(id);
      res.status(200).json(updateCustomer);
    } else {
      res.status(404);
      throw new Error(`Can't find any customer with ID ${id}`);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const deleteProductOfCustomer = asyncHandler(async (req, res) => {
  try {
    const { id, productId } = req.body;

    const customer = await Customers.findById(id);
    if (!customer) {
      res.status(404).json({ message: `Customer with ID ${id} not found` });
      return;
    }

    const existingProductIndex = customer.purchase.findIndex(item => item.productId.toString() === productId);

    if (existingProductIndex !== -1) {
      if (customer.purchase[existingProductIndex].quantity > 1) {
        await Customers.updateOne(
          { _id: id, 'purchase.productId': productId },
          { $inc: { 'purchase.$.quantity': -1 } }
        );
      } else {
        await Customers.updateOne(
          { _id: id },
          { $pull: { purchase: { productId: productId } } }
        );
      }

      const updateCustomer = await Customers.findById(id);
      res.status(200).json(updateCustomer);
    } else {
      res.status(404).json({ message: `Product with ID ${productId} not found in customer's purchase` });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = {
  createCustomer,
  getAllCustomer,
  getSingleCustomer,
  deleteSingleCustomer,
  updateCustomer,
  insertProductForCustomer,
  deleteProductOfCustomer,
};
