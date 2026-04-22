const {test,expect} = require('@playwright/test');

test('popup validations',async({page})=>{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    // await page.goto('https://google.com');
    // await page.goBack();
    // await page.goForward();

    //Hidden items 
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();

    await page.pause();
    page.on('dialog',dialog=>dialog.accept()); //Accept /
    //Alert Popup 
    await page.locator('#confirmbtn').click(); 
    
    //Hover
    await page.locator('#mousehover').hover();


    //i-Frames 
    const frame = page.frameLocator('#courses-iframe');
    await frame.getByRole('link',{name:'All Access plan'}).click();
    const text = await frame.locator('.text h2').textContent();
    console.log(text.split(' ')[1]);
})