const {test, expect}  = require('@playwright/test');

//Test case: 1 - Login Validation
test("First Playwright Test Login",async ({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    //css selectos  - type,fill
    await page.locator("[name='username']").fill('rahulshettyacademy');
    await page.locator("[name='password']").fill('Learning@830$3mK2');
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
    await username.fill('rahulshetty')
    await page.locator("#password").fill('Learning@830$3mK2');
    await signIn.click();
    const errorMsg = page.locator("[style*='block']");
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText('Incorrect');
    await username.fill('rahulshettyacademy');
    await signIn.click();
    // console.log(await item.nth(2).textContent());
    // await expect(item.nth(2)).toContainText('Nokia');
    await expect(item.first()).toBeVisible();
    const textTitles = await item.allTextContents();
    const isPresent = textTitles.some(ele=>ele==='iphone X');
    expect(isPresent).toBe(true);
});

//Test case : 3
test("Default test",async ({page})=>{
    await page.goto('https://google.com');
    console.log(await page.title());
    await expect(page).toHaveTitle('Google');
});