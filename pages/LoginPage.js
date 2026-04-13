class LoginPage{
    constructor(page) {    //All locators inside the constructor
        this.page = page;
        this.email = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.loginBtn = page.locator("[name='login']");
    }

    async goTo()
    {
        await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    }

    async login(username,password){
        await this.email.fill(username);
        await this.password.fill(password);
        await this.loginBtn.click();
    }
}
module.exports = {LoginPage};
