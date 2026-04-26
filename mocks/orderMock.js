const mockOrderResponse = async(page)=>{
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/69d925e4f86ba51a6559bd47',async(route)=>{
        await route.fulfill({
            status:200,
            contentType:'application/json',
            body:JSON.stringify({
                data:[],
                message: 'No Orders'
            })
        })
    });
}


const viewOrderDetailsResponse = async(page)=>{
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*',async(route)=>{
        await route.continue({
            url:'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=69eb372cf86ba51a65829f3d'})
    })
}
module.exports = {mockOrderResponse,viewOrderDetailsResponse};