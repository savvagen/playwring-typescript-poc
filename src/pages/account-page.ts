import {BasePage} from "./base-page";
import {Page} from "@playwright/test";
import {Step} from "../decorators/step-decorators";
import {Locator} from "playwright";
import {Header} from "./components/footer";


export class AccountPage extends BasePage {

    avatar = ():Locator => this.locator(`.user-img`)
    headingUsername = (): Locator => this.locator(`h4 >> text=${this.username}`)
    editProfileButton = (): Locator => this.locator("//a[@href='/settings' and contains(text(), 'Edit Profile')]")
    header = (): Header => this.component( "nav[class*='navbar']", Header)

    constructor(public page: Page, public username: string) {
        super(page, "/@"+username, "Conduit");
    }

}
