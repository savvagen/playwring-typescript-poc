import {APIRequestContext, request, test, TestInfo} from "@playwright/test";
import {APIResponse} from "playwright";
import {BaseController} from "./base-controller";
import {Article} from "../models/user";




export class ArticleController extends BaseController{


    constructor(protected request: APIRequestContext, public apiUrl: string, protected testInfo: TestInfo, private token?: string) {
        super(request, testInfo)
    }

    async getArticles(): Promise<APIResponse> {
        return this.get(`${this.apiUrl}/articles`,
            {
                headers: {
                    "content-type": "application/json",
            }}
        )
    }

    async createArticle(article: Article): Promise<APIResponse> {
        return this.post(`${this.apiUrl}/articles`,
            {
                data: {"article": article},
                headers: {"content-type": "application/json", "Authorization": `Token ${this.token}`},
            }

        )
    }

}
