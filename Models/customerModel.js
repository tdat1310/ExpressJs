const mongoose = require("mongoose");
const customerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"], // Corrected from `require` to `required`
    },
    age: {
      type: Number,
      required: true,
    },
    purchase: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: false,
        },
        quantity: {
          type: Number,
          required: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
