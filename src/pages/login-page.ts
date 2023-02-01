import {Page} from "@playwright/test";
import {Locator} from "playwright";
import {Step} from "../decorators/step-decorators";
import {BasePage} from "./base-page";
import {HomePage} from "./home-page";
import {Header} from "./components/footer";
import {User} from "../models/user";


export class LoginPage extends BasePage {

    header = (): Header => this.component("nav[class*='navbar']", Header)
    public emailFiled = (): Locator => this.getByPlaceholder("Email")
    public passwordFiled = (): Locator => this.getByPlaceholder("Password")
    public signInButton = (): Locator => this.page.getByRole("button", {name: "Sign in"})

    constructor(protected page: Page) {
        super(page, "/login", "Conduit")
    }

    @Step()
    async login(user: User) {
        await this.emailFiled().fill(user.email)
        await this.passwordFiled().fill(user.password)
        await this.signInButton().click()
        return new HomePage(this.page);
    }

    @Step()
    async loginWith(email: string, password: string){
        await this.emailFiled().fill(email)
        await this.passwordFiled().fill(password)
        await this.pressLogin()
    }


    @Step()
    async pressLogin(){
        await this.signInButton().click()
    }


}
