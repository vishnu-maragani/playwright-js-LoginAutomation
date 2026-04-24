require("dotenv").config();
const { test, expect} = require("@playwright/test");
const {ApiUtils}  = require('./utils/Api_tests_general');

// Global test run for Token and OrderId 
let response;
test.beforeAll(async({request})=>{
    const API = new ApiUtils(request);
    response = await API.createOrder();
})


// End to End Test Automation
test("E2E Test case Scenario", async ({ page }) => {

  //By pass login using API 
  await page.addInitScript(value=>{
    window.localStorage.setItem('token',value);     //LOGIN BYPASS USING addInitScript
  },response.token); 

  //Creating order using order ID:
  await page.goto('https://rahulshettyacademy.com/client/#/dashboard/dash');
  await page.locator("[routerlink*='myorders']").click();
  await page.locator('.table').waitFor();
  const allId =await page.locator('tbody tr th').allTextContents();
  expect(allId.some(ele=>response.orderId.includes(ele))).toBe(true);
  console.log(response.token);
  console.log(response.orderId);
});