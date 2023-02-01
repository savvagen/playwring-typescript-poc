import {expect, test} from "../../fixtures/api-fictures";
import { expect as assert } from 'chai'
import {APIResponse} from "playwright"
import {CONFIG} from "../../config/config";
import {ArticleController} from "../../controllers/article-controller";
import {Article} from "../../models/user";

const apiUrl = CONFIG.apiUrl

test.describe("api: article tests", ()=> {


    test("get articles", async ({articleController}, testInfo)=> {
        await test.step("get articles", async ()=> {
            const resp: APIResponse = await articleController.getArticles()
            await expect(resp).toBeOK();
            await assert(resp.status()).to.equal(200)
        })
    })

    test("create article", async ({articleController})=> {
        const article: Article = {
            "title":`How to train your dragon ${Math.floor(Math.random()*10000000000)}`,
            "description":"Ever wonder how?",
            "body":"Very carefully.",
            "tagList":["training", "dragons"]
        }
        const resp: APIResponse = await articleController.createArticle(article)
        await expect(resp).toBeOK();
        await assert(resp.status()).to.equal(200)
    })
})
