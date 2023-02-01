import {Page} from "@playwright/test";
import {Step} from "../decorators/step-decorators";
import {Locator} from "playwright";
import {Component, ComponentCollection, ComponentOptions} from "./components/base-component";


type LocatorOptions = { has: Locator, hasText: string }

export abstract class BasePage {

    protected constructor(protected page: Page, public url: string, public title: string) {}

    @Step()
    async open() {
        await this.page.goto(this.url, {waitUntil: "load"})
    }

    @Step()
    async reload(){
        await this.page.reload({waitUntil: "domcontentloaded"})
    }


    locator(selector: string, options?: LocatorOptions): Locator {
        return this.page.locator(selector, options)
    }

    component<T extends Component>(selector: string, target: { new(opts: ComponentOptions): T }): T {
        return new target({locator: this.page.locator(selector), page: this.page})
    }

    componentCollection<T extends Component>(selector: string, target: { new(opts: ComponentOptions): T }): ComponentCollection<T>{
        return new ComponentCollection<T>({locator: this.page.locator(selector), page: this.page}, target)
    }

    async componentList<T extends Component>(selector: string, target: { new(opts: ComponentOptions): T }): Promise<Array<T>>{
        const elList = await this.page.locator(selector).all()
        return elList.map(locator => new target({locator: locator, page: this.page}))
    }



    getByPlaceholder(text: string|RegExp, options?: { exact?: boolean; }): Locator {
        return this.page.getByPlaceholder(text, options)
    }


}
