import {Serializable} from "playwright-core/types/structs";
import {ReadStream} from "fs";
import {APIRequestContext, TestInfo} from "@playwright/test";
import {APIResponse} from "playwright";


type RequestOptions =  {
    data?: string|Buffer|Serializable;
    failOnStatusCode?: boolean;
    form?: {
        [key: string]: string|number|boolean;
    };
    headers?: {
        [key: string]: string;
    };
    ignoreHTTPSErrors?: boolean;
    maxRedirects?: number;
    multipart?: {
        [key: string]: string|number|boolean|ReadStream|{
            name: string;
            mimeType: string;
            buffer: Buffer;
        }
    }
    params?: {
        [key: string]: string|number|boolean;
    };
    timeout?: number;
}



export abstract class BaseController {

    protected constructor(protected request: APIRequestContext, protected testInfo: TestInfo){}

    async get(url: string, options?: RequestOptions){
        await this.testInfo.attach(`request ${url}`, { body: `GET ${url}`, contentType: "text/html"})
        const resp: APIResponse = await this.request.get(url, options)
        await this.testInfo.attach(`request ${url}`, {body: `${resp.status()}\n${await this.parseBody(resp)}`, contentType: "text/html"})
        return resp
    }

    async post(url: string, options?: RequestOptions){
        await this.testInfo.attach(`request ${url}`, { body: `GET ${url}`, contentType: "text/html"})
        const resp =  await this.request.post(url, options)
        await this.testInfo.attach(`request ${url}`, {body: `${resp.status()}\n${await this.parseBody(resp)}`, contentType: "text/html"})
        return resp
    }

    async parseBody(resp: APIResponse): Promise<string>{
        let bodyString = ''
        if ((await resp.text()).length > 0){
            bodyString = JSON.stringify(JSON.parse(await resp.text()), null, 4)
        }
        return bodyString
    }

}
