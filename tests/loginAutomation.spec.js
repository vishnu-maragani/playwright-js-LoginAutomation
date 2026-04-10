const {test, expect} = require('@playwright/test');


//Test login & Grabbing the text validation
test.only("Login Automation",async ({browser}) =>{

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    const username = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const signInButton = page.locator('#login');
    const textTitles = page.locator(".card-body b");

    await username.fill('april1@gmail.com');
    await password.fill('VisTech@0426');
    await signInButton.click();
    // await page.waitForLoadState('networkidle');                              // Wait for load state
    // await expect(textTitles.first()).toBeVisible();
    await textTitles.last().waitFor();
    const allTexts = await textTitles.allTextContents();
    console.log(allTexts);
    const isPresent = allTexts.some(ele=>ele === 'iphone 13 pro');
    expect(isPresent).toBe(true);

});