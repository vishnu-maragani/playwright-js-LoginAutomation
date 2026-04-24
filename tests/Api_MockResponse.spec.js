const {test,expect} = require('@playwright/test');
const {ApiUtils} = require('../utils/Api_tests_general');
const {mockOrderResponse}  = require('../mocks/orderMock');

let response;
test.beforeAll(async({request})=>{
    const API = new ApiUtils(request);
    response = await API.createOrder();
})
test('Networking mocking for No Orders',async ({page})=>{

    //Bypass login session using Session storage
    await page.addInitScript(value=>{
        window.localStorage.setItem('token',value);
    },response.token);
    
    //Network intercepting or mocking the response
    await mockOrderResponse(page);

    await page.goto('https://rahulshettyacademy.com/client/#/dashboard/dash');
    await page.locator("[routerlink*='myorders']").click();
    const text = await page.locator("[class*='mt-4']").textContent();
    expect(text).toContain('You have No Orders');
});