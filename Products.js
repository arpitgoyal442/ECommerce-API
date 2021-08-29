//Here We Are definintg the Scgema/Structure of our data

import mongoose from "mongoose";

const ProductsSchema= mongoose.Schema({
    productname:String,
    price:Number,
    stock:Number,
    instock:Boolean,

});



export default mongoose.model("products",ProductsSchema);