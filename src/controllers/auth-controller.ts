import {BaseController} from "./base-controller";
import {APIRequestContext, TestInfo} from "@playwright/test";


export class AuthController extends BaseController {

    constructor(protected request: APIRequestContext, public apiUrl: string, protected testInfo: TestInfo) {
        super(request, testInfo)
    }

    async login(email: string, password: string){
        return this.post(`${this.apiUrl}/users/login`, {
            data: { user: { email: email, password: password} },
            headers: {"content-type": "application/json; charset=utf-8"}
        })
    }

}
