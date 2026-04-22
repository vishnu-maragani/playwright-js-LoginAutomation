const {test,expect} = require('@playwright/test');

// //GET - Get user
test('My first API test',async({request})=>{
    const response = await request.get('https://jsonplaceholder.typicode.com/users/1');
    console.log("Status: ",response.status());
    
    //Printing response body 
    const body = await response.json();
    console.log('Respone:',body);
});

//POST - User creation
test('201 user created',async ({request})=>{
    const response = await request.post('https://jsonplaceholder.typicode.com/users',{
        data:{
            name:'Vishnu',
            email:'vishnu@gmail.com'
        }
    });
    console.log('Status:',response.status());
    const body = await response.json();
    console.log(body);
    expect(response.status()).toBe(201);
});


//GET - Non existence user
test('404 - user not found',async({request})=>{
    const response = await request.get('https://jsonplaceholder.typicode.com/users/9999');
    console.log('Status:',response.status());
    expect(response.status()).toBe(404);
    const body = await response.json();
    console.log(body);
})


//Assertion to the API GET Request
test('Get User data',async({request})=>{
    const response = await request.get('https://jsonplaceholder.typicode.com/users/2');
    console.log("Status: ",response.status());
    
    //Printing response body 
    const body = await response.json();
    console.log('Respone:',body);

    //Assertion to body response
    // expect(Array.isArray(body)).toBe(true); 
    expect(body.id).toBe(2);
    expect(body.name).toBe('Ervin Howell');
    expect(body.email).toBeTruthy();
    expect(typeof body.address).toBe('object');
});

//Update the User using PUT 
test('Upadet user details',async({request})=>{
    const response = await request.put('https://jsonplaceholder.typicode.com/users/2',{
        data:{
            name:'Vishnu updated',
            email:'vishnu.updated@gmail.com',
            phone:'64567876456'
        }
    });
    console.log('Status:',response.status());
    //Assertions
    const body = await response.json();
    console.log('Body:',body);
    expect(body.name).toBe('Vishnu updated');
    expect(body.phone).toBe('64567876456');
    expect(body.id).toBeTruthy();
})

//Deleting the user using DELETE
test('Delte the user',async({request})=>{
    const response = await request.delete('https://jsonplaceholder.typicode.com/users/2');
    console.log('Status:',response.status());
    const body = await response.json();
    console.log(body);

})


///////////////////////////////////////////////////////////////////////////////////////////////////
                                    //Token based Authentication
//////////////////////////////////////////////////////////////////////////////////////////////////
let token = '';
let productId = '';
let orderId = '';
test.beforeAll(async({request})=>{
    const response = await request.post('https://rahulshettyacademy.com/api/ecom/auth/login',{
        data:{
            userEmail:'rahulshetty@gmail.com',
            userPassword:'Iamking@000'
        }
    });

    console.log('Status:',response.status());
    expect(response.status()).toBe(200);
    const body = await response.json();
    token = body.token;   //Assigning token value for global usage
    console.log('Token in beforeAll:',token);
    expect(body.message).toBe('Login Successfully');
 
});

//Get All Products: - 
test('Get All products using AUth token',async({request})=>{
    const response = await request.post('https://rahulshettyacademy.com/api/ecom/product/get-all-products',{
        headers:{
            'Authorization':token,
            'Content-Type':'application/json'
        }
    });

    console.log('Status:',response.status());
    expect(response.status()).toBe(200);
    const body = await response.json();
    productId = body.data[0]._id;
    console.log("All products",body);
    
})

//Create one order: - 
test('Create Order',async({request})=>{
    const response = await request.post('https://rahulshettyacademy.com/api/ecom/order/create-order',{
        headers:{
            'Authorization':token,
        },
        data:{
            orders:[
                {
                    country:'India',
                    productOrderedId: productId
                }
            ]
        }
    });

    console.log('Status:',response.status());
    const body  = await response.json();
    console.log('Response for product creation:',body); 
    orderId = body.orders[0]
    expect(response.status()).toBe(201);
})

//View orders
test('View Created Order',async({request})=>{
    const response = await request.get(`https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=${orderId}`,{
        headers:{
            'Authorization':token
        }
    });

    console.log('View order Status',response.status());
    const body = await response.json();
    console.log('Order deatails: ',body);
    expect(response.status()).toBe(200)
});


//Delete the Order
test('Delete the created order',async({request})=>{
    const response = await request.delete(`https://rahulshettyacademy.com/api/ecom/order/delete-order/${orderId}`,{
        headers:{
            'Authorization':token
        }
    })
    console.log('Delet order status',response.status());
    const body = await response.json();
    console.log(body);
    expect(response.status()).toBe(200)
});