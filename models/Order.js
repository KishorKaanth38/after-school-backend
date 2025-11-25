import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    name: String,
    phone: String,
    cart: Array
});

export default mongoose.model("Order", orderSchema);
