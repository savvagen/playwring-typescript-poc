import {Component, ComponentOptions} from "./base-component";
import {Locator} from "playwright";


export class Article extends Component{

    component: Locator
    heading: Locator

    constructor(protected opts: ComponentOptions) {
        super(opts);
        this.component = opts.locator
        this.heading = this.component.locator("h1")
    }
}
