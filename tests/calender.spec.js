const {test,expect} = require('@playwright/test');

test('Calender check function',async ({page})=>{

    const month = '6';
    const year = '2027';
    const date ='15';
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers',{
        waitUntil:"domcontentloaded"
    });
    await page.locator('.react-date-picker__calendar-button').click();
    await page.locator('.react-calendar__navigation__label').click();
    await page.locator('.react-calendar__navigation__label').click();
    await page.getByText(year).click();
    await page.locator('.react-calendar__year-view__months__month').nth(Number(month)-1).click();
    await page.locator("//abbr[text()='"+date+"']").click();
    await expect(page.locator("input[name='month']")).toHaveValue(month);
    await expect(page.locator("input[name='day']")).toHaveValue(date);
    await expect(page.locator("input[name='year']")).toHaveValue(year);
})