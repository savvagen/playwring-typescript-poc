import {BasePage} from "./base-page";
import {Page} from "@playwright/test";
import {Locator} from "playwright";
import {HomePage} from "./home-page";
import {Step} from "../decorators/step-decorators";


export class SettingsPage extends BasePage {


    heading = (): Locator => this.page.getByRole("heading", {name: "Your Settings"})
    logoutButton = (): Locator => this.locator("button >> text='Or click here to logout.'")

    constructor(page: Page) {
        super(page, "/settings", "Conduit")
    }

    @Step("LogOut")
    async logout(){
        await this.logoutButton().click()
        return new HomePage(this.page)
    }
}
