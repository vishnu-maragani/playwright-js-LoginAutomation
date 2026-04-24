require("dotenv").config();
const { test, expect } = require("@playwright/test");

let webContext;
test.beforeAll(async({browser})=>{
    const context  = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#userEmail").fill(process.env.EMAIL);
    await page.locator("#userPassword").fill(process.env.PASSWORD);
    await page.locator("[name='login']").click();
    await expect(page.locator('#products')).toBeVisible();
    await context.storageState({path:'state.json'})       //Using StorageState
    await context.close();
    webContext = await browser.newContext({storageState:'state.json'});
})

// End to End Test Automation
test("E2E Test case Scenario", async () => {

   //Bypass login using session storage
   const page = await webContext.newPage();
   await page.goto("https://rahulshettyacademy.com/client/");
  //Adding Items list
  const buyItem = 'adidas';
  await expect(page.locator('#products')).toBeVisible();
  await page.locator('.card-body').filter({hasText:buyItem}).getByRole('button',{name:'Add To Cart'}).click();
  await expect(page.locator('#toast-container')).toContainText('Product Added To Cart');
  await page.locator("[routerlink*='cart']").click();  //
  await page.waitForURL('**/cart');
  
  //Vrryfing added item in cart section
  const cartItems = page.locator('.cartSection h3');    
  await expect(cartItems.first()).toBeVisible({timeout:30*1000});
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


test('Test 2',async()=>{
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client/");
    //Adding Items list
    const buyItem = 'adidas';
    await expect(page.locator('#products')).toBeVisible();
    await page.locator('.card-body').filter({hasText:buyItem}).getByRole('button',{name:'Add To Cart'}).click();
    await expect(page.locator('#toast-container')).toContainText('Product Added To Cart');
    await page.locator("[routerlink*='cart']").click();  //
    await page.waitForURL('**/cart');
});