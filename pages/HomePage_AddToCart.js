
class HomePage_AddToCart{
    constructor(page){
        this.page = page;
        this.products = page.locator('.card-body');
        this.cartBtn = page.locator("[routerlink*='cart']");
    }

    async addToCart(productName){
        await this.products.filter({hasText:productName}).getByRole('button',{name:'Add To Cart'}).click();
    }

    async cart_orders(){
        await this.cartBtn.click();
    }
}

module.exports = {HomePage_AddToCart};