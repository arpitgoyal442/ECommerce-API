const PRODUCT_TBL='products'
const PRODUCT_TYPES_TBL='product_types'

const PRODUCT_ATTR_TBL='product_attributes'

const ATTRIBUTES_TBL='attributes'
const USER_TBL=`users`


const TABLE_COLS={

    products:['product_id','product_name','product_type_id','price','description','product_images','stock','sale']
}

const ITEM_PER_PAGE=4

const CART_TBL='cart'


const otpMailTemplate=(otp)=>`

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>OTP Email Template</title>
</head>
<body style="font-family: Arial, sans-serif;">

<table cellpadding="0" cellspacing="0" width="100%" style="background-color: #f7f7f7; padding: 30px;">
    <tr>
        <td align="center">
            <img src="https://arpitecommerceapp.s3.ap-south-1.amazonaws.com/logo.png" alt="Your Site Logo" style="max-width: 200px; margin-bottom: 20px;">
        </td>
    </tr>
    <tr>
        <td align="center">
            <h2 style="margin: 0; color: #333;">Login OTP</h2>
            <p style="margin-top: 10px; font-size: 16px; color: #555;">Use the following OTP to authenticate your account:</p>
            <h1 style="font-size: 32px; margin: 20px 0; color: #007bff;">${otp}</h1>
            <p style="font-size: 14px; color: #555;">This OTP is valid for a single use and should not be shared with anyone.</p>
        </td>
    </tr>
</table>

</body>
</html>

`




module.exports={PRODUCT_TBL,PRODUCT_ATTR_TBL,PRODUCT_TYPES_TBL,ATTRIBUTES_TBL,TABLE_COLS,ITEM_PER_PAGE,CART_TBL,USER_TBL,otpMailTemplate}