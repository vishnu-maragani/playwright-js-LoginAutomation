require('dotenv').config();
const {test,expect} = require('@playwright/test');
const {LoginPageUserDetails,LoginPage2, HomePage_Validation} = require('../pages');
test('E2E scenario for login test',async({page})=>{

    //Object creation for page class access
    const loginpageform = new LoginPageUserDetails(page);
    const login = new LoginPage2(page);
    const homepage = new HomePage_Validation(page);
    //env set-up
    const username= process.env.ADMINNAME;
    const useremail=process.env.ADMINEMAIL;
    const userph=process.env.ADMINPH;

    //POM structure 
    //Register user account
    await login.goTo();
    await loginpageform.forgotPassword();
    await loginpageform.userDetails(username,useremail,userph);
    await loginpageform.resetLogin();
    await loginpageform.passwordLocator().waitFor();
    const  userPass= await loginpageform.passwordMsg();

    //Login to application
    await login.goToLoginPage();
    await login.login(username,userPass);
    await login.submitLogin();

    //HomePage-Validation
    await expect(homepage.loginValidationMsg()).toContainText('successfully');
    await homepage.logout();
    await login.submitBtn.waitFor();
    await login.submitLogin();
    await expect(login.wrongLogin()).toContainText('Incorrect username');
});