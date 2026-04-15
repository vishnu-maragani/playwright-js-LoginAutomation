class HomePage_Validation{
    constructor(page){
        this.page = page;
        this.msgLocator = page.getByText('You are successfully logged in');
        this.logoutBtn = page.locator('.logout-btn');
    }

    loginValidationMsg(){
        return this.msgLocator
    }
    async logout()
    {
        await this.logoutBtn.click();
    }
}
module.exports = {HomePage_Validation};