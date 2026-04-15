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


class LoginPageUserDetails{
    constructor(page){
        this.page = page;
        this.forgotPass = page.locator('.forgot-pwd-container');
        this.username =  page.getByPlaceholder('Name',{exact: true});
        this.email = page.getByPlaceholder('Email');
        this.phNum = page.getByPlaceholder('Phone Number');
        this.resetBtn = page.locator('.reset-pwd-btn'); 
        this.password =  page.locator('.infoMsg');
    }

    async forgotPassword(){
        await this.forgotPass.click();
    }
    async userDetails(name,email,phNo){
        await this.username.fill(name);
        await this.email.fill(email);
        await this.phNum.fill(phNo);
    }
    async resetLogin(){
        await this.resetBtn.click();
    }
    passwordLocator(){
        return this.password;
    }
    async passwordMsg()
    {
        const text = await this.password.textContent();
        const userPass = text.split("'")[1];
        return userPass;
    }
};


class LoginPage2{
    constructor(page){
        this.page = page;
        this.loginBtn = page.locator('.go-to-login-btn');  //
        this.username = page.locator('#inputUsername');
        this.password = page.locator("[name='inputPassword']");
        this.chekBox1 = page.locator("[for='chkboxOne']");
        this.checkBox2 = page.locator('#chkboxTwo');
        this.submitBtn = page.locator("[type='submit']");
        this.errorLocator = page.locator('.error');
    }

    async goTo(){
        await this.page.goto('https://rahulshettyacademy.com/locatorspractice/');
    }
    async goToLoginPage(){
        await this.loginBtn.click();
    }
    async login(user,pass){
        await this.username.fill(user);
        await this.password.fill(pass);
        await this.chekBox1.click();
        await this.checkBox2.click();
    }
    async submitLogin(){
        await this.submitBtn.click();
    }   
    submitBtn(){
        return this.submitBtn;
    }
    wrongLogin(){
        return this.errorLocator;
    }
}
module.exports = {LoginPage,LoginPageUserDetails,LoginPage2};
