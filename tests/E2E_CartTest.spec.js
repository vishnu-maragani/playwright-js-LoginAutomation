require('dotenv').config();
const { test, expect } = require("@playwright/test");
const {LoginPage,HomePage_AddToCart,MyCart,PlaceOrder,ProductOrderConfirmation}  = require('../pages');


// End to End Test Automation
test("E2E Test case Scenario", async ({ page }) => {
  const loginpage = new LoginPage(page);
  const homePage  = new HomePage_AddToCart(page);
  const cartPage = new MyCart(page);
  const placeorder = new PlaceOrder(page);
  const orderCnf = new ProductOrderConfirmation(page);
  const item = 'adidas'; 
  const state = 'indi';

  //Login
  const username = process.env.EMAIL;
  const password = process.env.PASSWORD;
  await loginpage.goTo();
  await loginpage.login(username,password);

  //Add product to cart
  await homePage.addToCart(item);
  await homePage.cart_orders();

  //Products verifying & Checkout
  await expect(cartPage.cartItemsVerify(item)).toBeVisible();
  await cartPage.checkOut();

  //Payment method
  await expect(placeorder.getCountryInput()).toBeVisible();
  await placeorder.selectCountry(state);
  await placeorder.getOrderBtn().click();
  
  //Product Order Confirmation
  await expect(orderCnf.messageCheck()).toContainText(' Thankyou for the order. ');
  //Order ID confirmation
  const rawID = await orderCnf.rawId();
  await orderCnf.orderLink().click();
  const AvilableIDs = await orderCnf.existedIds();
  expect(AvilableIDs).toContain(rawID);

});