import {Locator} from "playwright";
import {Page} from "@playwright/test";
import {Component, ComponentOptions} from "./base-component";
import {Step} from "../../decorators/step-decorators";
import {SettingsPage} from "../settings-page";


export class Header extends Component {

    homeButton: Locator
    accountButton: (s: string) => Locator
    settingButton: Locator
    signInButton: Locator

    constructor(protected opts: ComponentOptions) {
        super(opts);
        this.homeButton = this.component.locator("a >> text='Home'")
        this.accountButton = (username: string) => this.component.locator(`a[href*='${username}']`)
        this.settingButton = this.component.locator("a[href='/settings']")
        this.signInButton = this.component.locator("a[href='/login']")
    }

    @Step()
    async openSettings(){
        await this.settingButton.click()
        return new SettingsPage(this.opts.page)
    }

}
