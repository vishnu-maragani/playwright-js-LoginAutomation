require("dotenv").config();
const { test, expect } = require("@playwright/test");
const {getToken, createOrder} = require('../utils/Api_tests_general');

//Gloable run test case API 
let token = '';
let orderId = '';
test.beforeAll(async({request})=>{
  token = await getToken({request});
  orderId = await createOrder({request});
  console.log("Token: ",token);
  console.log('Order Id: ',orderId);
});

// End to End Test Automation
test("E2E Test case Scenario", async ({ page }) => {
  
  //Bypass login by injecting token into Storage 
  await page.addInitScript(value=>{
    window.localStorage.setItem('token',value);
  },token);

  //Navigate to Dahsboard or home page.
  await page.goto('https://rahulshettyacademy.com/client/#/dashboard/dash');
  await page.locator("[routerlink*='myorders']").click();
  
  //Confriming the placed order.
  await page.locator('.table').waitFor();
  const allId =await page.locator('tbody tr th').allTextContents();
  console.log(allId);
  expect(allId.some(ele=>orderId.includes(ele))).toBe(true);
});
