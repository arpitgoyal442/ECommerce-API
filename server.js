
//Importing Stuff
import express from "express"
import  mongoose from "mongoose"
import cors from "cors"
import products from "./Products.js"


//App Config
const app=express();
const port=process.env.PORT || 9000;


//middleware
app.use(express.json());
app.use(cors());


//DataBase Config
 const password= "5qGcCjqJQ27uoXwN";
mongoose.connect("mongodb+srv://admin:5qGcCjqJQ27uoXwN@cluster0.va1ff.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
const db=mongoose.connection;
db.once("open",()=>{console.log("DB is Connected Successfully !!")});





//Routing


app.get("/",(req,res)=>{
    res.status(200).send("Hello All !!");
})

//To View All Products
app.get("/viewall",(req,res)=>{

    products.find((err,data)=>{
        if(err)
        console.log(err);

        else res.status(200).send(data);
    })
})

//Using this POST request Admin Can Add New Products
app.post("/admin/newproduct",(req,res)=>{

    const productInfo=req.body;

    products.create(productInfo , (err,data)=>{
        if(err)
        console.log(err);
        else res.status(201).send("Inserted :" + data);
    });
});

//using this POST Request Admin can Update Products Info
app.post("/admin/update", async (req,res)=>{

    // const productId=req.id;

    const product=req.body;
    
    const filter = {productname:product.productname};
   
    const update = {price:product.price, instock:product.instock};
    let doc = await products.findOneAndUpdate(filter, update, {
        new: true
      });

      res.send("Updated Successfully");

});

//Using this Post Request Admin can Delete products
app.post("/admin/delete",(req,res)=>{

    products.remove({ productname: req.body.productname }, function(err) {
        if (!err) {
                res.send("Deleted Successfully!!");
        }
        else {
                message.type = 'error';
        }
    });
})



//Listeners
app.listen(port,()=>{console.log("server running on port :"+port)});
