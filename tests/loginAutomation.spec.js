const {test, expect} = require('@playwright/test');


//Test login & Grabbing the text validation
test("Login Automation",async ({browser,page}) =>{

    // const context = await browser.newContext();
    // const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    const username = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const signInButton = page.locator('#login');
    const signInError = page.locator('.toast-message');
    const textTitles = page.locator(".card-body b");

    //Login credentials 
    require('dotenv').config();
    const user = process.env.EMAIL;
    const pass = process.env.PASSWORD;
    await username.fill('sabxsax@gmail.com');
    await password.fill(pass);
    await signInButton.click();
    expect(await signInError.textContent()).toContain('Incorrect email');
    await username.fill(user);
    await signInButton.click();
    // await page.waitForLoadState('networkidle');                              // Wait for load state
    // await expect(textTitles.first()).toBeVisible();
    await textTitles.last().waitFor();
    const allTexts = await textTitles.allTextContents();
    console.log(allTexts);
    const isPresent = allTexts.some(ele=>ele === 'iphone 13 pro');
    expect(isPresent).toBe(true);

});