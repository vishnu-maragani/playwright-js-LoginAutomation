const {test,expect} = require('@playwright/test');
const {ApiUtils} = require('../utils/Api_tests_general');
const {viewOrderDetailsResponse}  = require('../mocks/orderMock');

//Bypass Login 
let response;
test.beforeAll(async({request})=>{
    const API = new ApiUtils(request);
    response = await API.createOrder();
})
test('Network Intercepting with with another login endpoint',async({page})=>{

    //Step 1: Bypass Login session using API 
    await page.addInitScript(value =>{
        window.localStorage.setItem('token',value);
    },response.token);

    //Step 2: Netwrok interceptiing before action
    await viewOrderDetailsResponse(page);

    //Step 3: Click on order page
    await page.goto('https://rahulshettyacademy.com/client/#/dashboard/dash');
    await page.locator("button[routerlink*='myorders']").click();
    
    //Step 3: CLick on view button 'orders'
    await page.locator('.btn-primary').first().click();

    //Step4: Validating UI message for Unauthorized view 
    await expect(page.getByText('You are not authorize to view')).toBeVisible();
    
})