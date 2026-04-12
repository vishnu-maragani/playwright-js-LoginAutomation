const {test,expect} = require('@playwright/test');

// End to End Test Automation
test.only('E2E Test case Scenario',async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    
    //Login credentials:-
    let username= 'april@gmail.com';
    let password ='VisTech@0426';



    //Login to the Application
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.locator('#userEmail').fill(username);
    await page.locator('#userPassword').fill(password);
    await page.locator("[name='login']").click();
    const errorMsg = page.locator(".toast-message");
    await expect(errorMsg).toContainText('Incorrect email');
    username='april1@gmail.com';
    await page.locator('#userEmail').fill(username);
    await page.locator("[name='login']").click();

    //Grabbing product Items list
        const buyItems = ['adidas','iphone'];
        const itemLocator =  page.locator(".card-body");
        await itemLocator.last().waitFor();
        for(const product of buyItems){
            const matchCard = itemLocator.filter({hasText:product});
            if(await matchCard.count()>0)
            {
             await matchCard.first().locator('.w-10').click(); 
            }
        }
    //Cliicking on cart button and validating added products
    await page.locator("[routerlink*='cart']").click();
    const productsAddedCart = page.locator(".cart");
    for(const item of buyItems)
    {
        await expect(productsAddedCart.filter({hasText:item})).toBeVisible();
    } 
    await page.locator('.totalRow button').click() //Checkout button clicking
    await page.locator("[placeholder*='Country']").pressSequentially('indi');
    const dropDown = page.locator('.ta-results');
    await dropDown.waitFor();
    // const optionsCount = await dropDown.locator('button').count();
    // for(let i=0;i<optionsCount;i++)
    // {
    //     const text = await dropDown.locator('button').nth(i).textContent();
    //     if(text === ' India')
    //     {
    //         await dropDown.locator('button').nth(i).click();
    //         break;
    //     }
    // }
    const optionCount = await dropDown.locator('button').count();
    for(let i=0;i<optionCount;i++)
    {
        const text = await dropDown.locator('button').nth(i).textContent();
        if(text === ' India')
        {
            await dropDown.locator('button').nth(i).click();
            break;
        }
    }
    await expect(page.locator('.user__name label')).toHaveText(username);
    await page.locator('.actions a').click()  //Placing order
    await expect(page.locator('.hero-primary')).toContainText('Thankyou for the order');
    const DumpIds = await page.locator('.em-spacer-1 .ng-star-inserted').allTextContents();
    const orderIds = DumpIds.map(ele=>ele.replace(/\|/g,'').trim());
    console.log(orderIds);

    await page.locator("li [routerlink*='myorders']").click(); //Going to orders section
    const ordersLocators = page.locator('tbody tr');
    // await ordersLocators.first().waitFor();
    // const allOrderIds  = await ordersLocators.locator('th').allTextContents();
    // console.log(allOrderIds);
    // expect (orderIds.every(ele=>allOrderIds.includes(ele))).toBe(true); //Orderd ID are matched..Successfull
    for(let i=0;i<await ordersLocators.count();i++)
    {
        const id = await ordersLocators.nth(i).locator('th').textContent();
        console.log(id);
        if(orderIds.map(ele=>ele.trim()).includes(id))
        {
            await ordersLocators.nth(i).locator('button').click();
            break;
        }
    }


    // await page.pause();
});