const {test, expect}  = require('@playwright/test');

//Test case: 1 - Login Validation
test("First Playwright Test Login",async ({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const doccumentLink = page.locator("[href*='request']");
    console.log(await page.title());

    //Login Credentials 
    require('dotenv').config();
    const user = process.env.ADMINUSER;
    const pass = process.env.ADMINPASS;

    //css selectos  - type,fill
    await page.locator("[name='username']").fill(user);
    await page.locator("[name='password']").fill(pass);
    await page.locator("[value='user']").click();
    await page.locator('#okayBtn').click();
    await page.locator("[data-style='btn-info']").selectOption('teach');
    await page.locator('#terms').click();
    await page.locator("[value='Sign In']").click();
});


//Test case: 2  - Invalid login 
test("Invalid login",async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const username = page.locator("#username");
    const signIn = page.locator('#signInBtn');
    const item = page.locator(".card-body a");
    console.log(await page.title());

    //Login Credentials 
    require('dotenv').config();
    const user = process.env.ADMINUSER;
    const pass = process.env.ADMINPASS;

    await username.fill('anonymous')
    await page.locator("#password").fill(pass);
    await signIn.click();
    const errorMsg = page.locator("[style*='block']");
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText('Incorrect');
    await username.fill(user);
    await signIn.click();
    // console.log(await item.nth(2).textContent());
    // await expect(item.nth(2)).toContainText('Nokia');
    await expect(item.first()).toBeVisible();
    const textTitles = await item.allTextContents();
    const isPresent = textTitles.some(ele=>ele==='iphone X');
    expect(isPresent).toBe(true);
});

//Test case : 3 (Google visiting)
test("Default test",async ({page})=>{
    await page.goto('https://google.com');
    console.log(await page.title());
    await expect(page).toHaveTitle('Google');
});


//Test case : 4 -- Child windows handling for invalid login case
test('Child windows handle ',async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const username = page.locator('#username');
    const passowrd = page.locator('#password');
    const signInBtn = page.locator(" [type='submit']");
    const error = page.locator("[style*='none']");
    const doccumentLink = page.locator("[href*='request']");

    //Login Credentials 
    require('dotenv').config();
    const user = process.env.ADMINUSER;
    const pass = process.env.ADMINPASS;
    //Login
    await username.fill('anonymous');
    await passowrd.fill(pass);
    await signInBtn.click();
    const text = await error.textContent();
    expect(text).toContain('Incorrect'); 
    const [newPage] = await Promise.all([   //Opening new child window context using waitForEvent
        context.waitForEvent('page'),
        doccumentLink.click()
    ]);
    const emailId = await newPage.locator("[href*='mailto']").textContent();
    const name = emailId.split('@')[1].split('.')[0];
    console.log(name);
    await username.fill(name);
    await signInBtn.click();

})