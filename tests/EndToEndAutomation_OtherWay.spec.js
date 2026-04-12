    const {test,expect} = require('@playwright/test');

    // End to End Test Automation
    test.only('E2E Test case Scenario',async ({browser})=>{
        const context = await browser.newContext();
        const page = await context.newPage();
        
        //Login credentials:-
        require('dotenv').config();
        let username = process.env.EMAIL;
        let password = process.env.PASSWORD;

        //Login to the Application
        await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

        await page.getByPlaceholder('email@example.com').fill(username);
        await page.getByPlaceholder('enter your passsword').fill(password);
        await page.getByRole('button',{name:'Login'}).click();

        await page.waitForURL('**/dashboard/dash', { timeout: 40000 }); 
        await expect(page.locator('.card-body').first()).toBeVisible({timeout:30000});
        await page.locator('.card-body').filter({hasText:'ADIDAS ORIGINAL'}).getByRole('button',{name:'Add To Cart'}).click();
        await page.locator('li').getByRole('button',{name:'Cart'}).click();
        await page.getByText('ADIDAS ORIGINAL').isVisible();
        await page.locator('li').getByRole('button',{name:'Checkout'}).click();
        await page.getByPlaceholder('Select Country').pressSequentially('indi');
        await page.getByRole('button',{name:'India'}).nth(1).click();
        await page.getByText('Place Order').click();
        await page.getByText(' Thankyou for the order. ').isVisible();
    });