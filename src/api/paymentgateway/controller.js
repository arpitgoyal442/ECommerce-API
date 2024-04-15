

const stripe=require('stripe')("sk_test_51Ns4WFSFwU95K8cx45eecc6O519QjmJWH6fby9PhWdik9TJJTV7JHMsXE7QXDIrkpEUJXu74mXbtzNGVNfQVF5yh006CHxMOW2")
const { v4 : uuidv4 } =require( 'uuid');
const makePayment=async (req,res,next)=>{

    let cartItems=req.body.cartItems
    let lineItems=[];

    for(let i=0;i<cartItems.length;i++){

        let product=cartItems[i];

        lineItems.push({

            price_data:{

                currency:"INR",
                product_data:{
                    name:product.product_name,
                    images:product.product_images
                },
                unit_amount:product.price
            },
            quantity:1

        })

    }

   

    try {

        const session=await stripe.checkout.sessions.create({

            payment_method_types:["card"],
            mode:"payment",
            line_items:lineItems,
            success_url:'http://localhost:3000/success',
            cancel_url:'http://localhost:3000/cancel'
        })


        res.json({id:session.id})

     

}catch(e){

    console.log(e)

    res.send(e)

}
}

module.exports={makePayment}


