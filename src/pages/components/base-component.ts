import {Page} from "@playwright/test";
import {Locator} from "playwright";

export type ComponentOptions = {
    locator: Locator
    page: Page
}

export abstract class Component {

    component: Locator

    protected constructor({page, locator}: ComponentOptions) {
        this.component = locator
    }

}


export class ComponentCollection <T extends Component> {

    component: Locator
    componentList: Promise<Array<Locator>>

    constructor(private opts: ComponentOptions, private target: { new(opts: ComponentOptions): T }) {
        this.component = this.opts.locator
        this.componentList = this.component.all()
    }

    async get(index: number): Promise<T>{
        const loc = this.component.nth(index)
        return new this.target({locator: loc, page: this.opts.page})
    }

     async size(): Promise<number> {
        return (await this.componentList).length

    }


}
