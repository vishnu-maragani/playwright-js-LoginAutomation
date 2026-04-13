class PlaceOrder{
    constructor(page){
        this.page= page;
        this.country = page.getByPlaceholder('Select Country');
        this.dropdown =  page.locator('.ta-results button');
        this.placeOrderBtn =  page.locator('.btnn');
    }

    getCountryInput(){
        return this.country;
    }
    async selectCountry(name){
        await this.country.pressSequentially(name);
        await this.dropdown.filter({hasText:' India'}).nth(1).click();
    }
    getOrderBtn()
    {
         return this.placeOrderBtn;
    }
}
module.exports = {PlaceOrder};