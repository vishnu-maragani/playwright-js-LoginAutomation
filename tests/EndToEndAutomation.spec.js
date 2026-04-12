const { test, expect } = require("@playwright/test");

// End to End Test Automation
test.only("E2E Test case Scenario", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  //Login Credentials
  require("dotenv").config();
  const username = process.env.EMAIL;
  const password = process.env.PASSWORD;

  //Login to the Application
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await page.locator("#userEmail").fill(username);
  await page.locator("#userPassword").fill(password);
  await page.locator("[name='login']").click();

  //Adding Items list
  const buyItem = 'zara';
  await page.locator('.card-body').filter({hasText:buyItem}).getByRole('button',{name:'Add To Cart'}).click();
  await page.locator("[routerlink*='cart']").click();
 
  //Vrryfing added item in cart section
  await expect(page.locator('.cart').filter({hasText:buyItem})).toBeVisible();

  //Checkout  & Place Order
  await page.locator("[style*='none'] button").click();
  await expect(page.getByPlaceholder('Select Country')).toBeVisible();
  await page.getByRole('textbox',{name:'Select Country'}).pressSequentially('indi');
  await page.locator('.ta-results button').filter({hasText:' India'}).nth(1).click();
  await page.locator('.btnn').click();
  

  //Product order confirmation
  await expect(page.locator('.hero-primary')).toContainText(' Thankyou for the order. ');
  const RaworderID = await page.locator('label:has-text("|")').textContent();
  const orderId = RaworderID.replace(/\|/g, "")
  await page.getByText('Orders History Page').click();
  await page.locator('.table').waitFor();
  const allId =await page.locator('tbody tr th').allTextContents();
  expect(allId.some(ele=>orderId.includes(ele))).toBe(true);
});
