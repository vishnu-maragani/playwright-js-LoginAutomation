class ProductOrderConfirmation{
    constructor(page){
        this.page = page;
        this.messageLocator= page.locator('.hero-primary');
        this.RawOrderId = page.locator('label:has-text("|")');
        this.orderPage = page.getByText('Orders History Page');
        this.tablePage = page.locator('.table');
        this.allIdLocators = page.locator('tbody tr th');
    }

    messageCheck(){
        return this.messageLocator;
    }
    orderLink()
    {
        return  this.orderPage;
    }

    async rawId(){
        const text = await this.RawOrderId.textContent(); 
        return text.replace(/\|/g, "").trim();
    }

    async existedIds(){

        await this.tablePage.waitFor();
        return await this.allIdLocators.allTextContents();
    }
}
module.exports = {ProductOrderConfirmation};