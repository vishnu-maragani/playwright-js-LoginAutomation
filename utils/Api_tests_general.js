require('dotenv').config();

//API for Token
let token = ''
const getToken = async({request})=>{
    const response = await request.post('https://rahulshettyacademy.com/api/ecom/auth/login',{
        data:{
            userEmail:process.env.EMAIL,
            userPassword: process.env.PASSWORD
        }
    });
    
    console.log(response.status());
    const body = await response.json();
    token = body.token;
    return token;
};


//API test for placing order
let orderPayload = {"orders":[{"country":"India","productOrderedId":"6960eae1c941646b7a8b3ed3"}]};
const createOrder = async({request})=>{
    const response = await request.post('https://rahulshettyacademy.com/api/ecom/order/create-order',{
        headers:{
            'Authorization': token
        },
        data: orderPayload  
    })
    console.log(response.status());
    const body = await response.json();
    const orderid = body.orders[0];
    return orderid;
}
module.exports = {getToken,createOrder};