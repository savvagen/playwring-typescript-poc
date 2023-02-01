import {Page} from "@playwright/test";
import {BasePage} from "./base-page";
import {Header} from "./components/footer";
import {Locator} from "playwright";
import {LoginPage} from "./login-page";
import {Step} from "../decorators/step-decorators";
import {Article} from "./components/article";
import {ComponentCollection} from "./components/base-component";


export class HomePage extends BasePage {

    signInButton = (): Locator => this.locator("a >> text='Sign in'")
    globalFeed = (): Locator => this.locator(".nav-item > a >> text='Global Feed'")
    header = (): Header => this.component( "nav[class*='navbar']", Header)
    articles = async (): Promise<Array<Article>> => await this.componentList("div .article-preview", Article)
    articlesColl = (): ComponentCollection<Article> => this.componentCollection("div .article-preview", Article)

    constructor(protected page: Page) {
        super(page, "/", "Conduit")
    }

    @Step()
    async signIn(){
        await this.signInButton().click()
        return new LoginPage(this.page)
    }


}
