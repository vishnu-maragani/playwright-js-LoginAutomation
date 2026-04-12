const {test,expect} = require('@playwright/test');

test('test for angualr website',async ({page})=>{
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.locator("form input[name='name']").fill('dummy');
    await page.locator("[name='email']").fill('dummy@gmail.com');
    await page.getByPlaceholder('Password').fill('DummyAdmin1234');
    await page.getByLabel('Check me out if you Love IceCreams!').check();
    await page.getByRole('combobox').selectOption('Female');
    await page.getByLabel('Employed').click();
    await page.getByRole('button',{value:'Submit'}).click();
    await page.getByText('Success! The Form has been submitted successfully!.').isVisible();
    await page.getByRole('link',{name:'Shop'}).click(); 
    await page.locator('app-card').filter({hasText:'Nokia Edge'}).getByRole('button',{name:'Add '}).click();
    await page.getByText('Checkout').click();
}) 