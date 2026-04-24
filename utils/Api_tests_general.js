require("dotenv").config();

class ApiUtils {
  constructor(request) {
    this.request = request;
  }

  async createOrder() {
    let response = {};

    //LoGIN - API

    const loginresponse = await this.request.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login",
      {
        data: {
          userEmail: process.env.EMAIL,

          userPassword: process.env.PASSWORD,
        },
      },
    );

    if (!loginresponse.ok()) {
      throw new Error("Login Failde");
    }

    console.log(loginresponse.status());

    const body = await loginresponse.json();

    response.token = body.token;

    //Create Order ID -- API

    const orderPayload ={
        orders:[
        {
          country: "India",

          productOrderedId: "6960eae1c941646b7a8b3ed3",
        }
      ]
    }
    const createorderResponse = await this.request.post(
      "https://rahulshettyacademy.com/api/ecom/order/create-order",{
        headers:{
            'Authorization': response.token,
            'Content-Type':'application/json'
        },
        data:orderPayload
      });
      if(!createorderResponse.ok())
      {
        throw new Error('Order Creation failed')
      }
    const orderResponse = await createorderResponse.json();
    response.orderId= orderResponse.orders[0];

    return response;
  }
}
module.exports = {ApiUtils};