const {test,expect} = require('@playwright/test');

test('E2E scenario for login test',async({page})=>{
    await page.goto('https://rahulshettyacademy.com/locatorspractice/');

    require('dotenv').config();
    const username= process.env.ADMINNAME;
    const useremail=process.env.ADMINEMAIL;
    const userph=process.env.ADMINPH;
    await page.locator('.forgot-pwd-container').click();
    await page.getByPlaceholder('Name',{exact: true}).fill(username);
    await page.getByPlaceholder('Email').fill(useremail);
    await page.getByPlaceholder('Phone Number').fill(userph);
    await page.locator('.reset-pwd-btn').click();
    
    const text = await page.locator('.infoMsg').textContent();
    const  userPass= text.split("'")[1];
    console.log(userPass)
    await page.locator('.go-to-login-btn').click();
    await page.locator('#inputUsername').fill(username);
    await page.locator("[name='inputPassword']").fill(userPass);
    await page.locator("[for='chkboxOne']").click();
    await page.locator('#chkboxTwo').click();
    await page.locator("[type='submit']").click();
    await expect(page.locator('p').filter({hasText:'successfully'})).toBeVisible();
    await page.locator('.logout-btn').click();
    await page.locator("[type='submit']").waitFor();
    await page.locator("[type='submit']").click();
    await expect(page.locator('.error')).toContainText('Incorrect username');
});