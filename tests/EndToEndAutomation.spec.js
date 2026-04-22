require("dotenv").config();
const { test, expect } = require("@playwright/test");

// End to End Test Automation
test("E2E Test case Scenario", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  //Login Credentials
  const username = process.env.EMAIL;
  const password = process.env.PASSWORD;

  //Login to the Application
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await page.locator("#userEmail").fill(username);
  await page.locator("#userPassword").fill(password);
  await page.locator("[name='login']").click();

  //Adding Items list
  const buyItem = 'adidas';
  await expect(page.locator('#products')).toBeVisible();
  await page.locator('.card-body').filter({hasText:buyItem}).getByRole('button',{name:'Add To Cart'}).click();
  await expect(page.locator('#toast-container')).toContainText('Product Added To Cart');
  await page.locator("[routerlink*='cart']").click();  //
  await page.waitForURL('**/cart');
 
  //Vrryfing added item in cart section
  const cartItems = page.locator('.cartSection h3');
  await expect(cartItems.first()).toBeVisible({timeout:10000});
  await expect(cartItems).toContainText(new RegExp(buyItem, 'i'));
  await page.locator("[style*='none'] button").click();

  //Place Order
  await expect(page.getByPlaceholder('Select Country')).toBeVisible();
  await page.getByRole('textbox',{name:'Select Country'}).pressSequentially('indi');
  await page.locator('.ta-results button').filter({hasText:' India'}).nth(1).click();
  await page.locator('.btnn').click();
  

  //Product order confirmation
  await expect(page.locator('.hero-primary')).toContainText(' Thankyou for the order. ');
  const RaworderID = page.locator('label.ng-star-inserted').first();
  await expect(RaworderID).toBeVisible(); 

  const raw = await RaworderID.textContent();
  const orderId = raw.replace(/\|/g, "").trim();
  await page.getByText('Orders History Page').click();
  await page.locator('.table').waitFor();
  const allId =await page.locator('tbody tr th').allTextContents();
  expect(allId.some(ele=>orderId.includes(ele))).toBe(true);
});
