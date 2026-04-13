class MyCart{
    constructor(page){
        this.page = page;
        this.cart = page.locator('.cart');
        this.checkout = page.locator("[style*='none'] button");
    }
    cartItemsVerify(productName){
        return this.cart.filter({hasText:productName});
    }

    async checkOut(){
        await this.checkout.click();
    }
}
module.exports = {MyCart};