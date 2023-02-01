import {expect, Page, test as base} from '@playwright/test';
import {User} from "../models/user";
import {CONFIG} from "../config/config";
import {ArticleController} from "../controllers/article-controller";
import {AuthController} from "../controllers/auth-controller";


type ApiFixtures = {
    articleController: ArticleController,
    authController: AuthController

}

const user: User = {
    username: CONFIG.user.username,
    email: CONFIG.user.email,
    password: CONFIG.user.password
}

export const test = base.extend<ApiFixtures>({
    articleController: async ({ request }, use, testInfo) => {
        const authController = new AuthController(request, CONFIG.apiUrl, testInfo)
        const loginResp = await authController.login(CONFIG.user.email, CONFIG.user.password)
        const token = JSON.parse(await loginResp.text()).user.token
        await use(new ArticleController(request, CONFIG.apiUrl, testInfo, token));
    },

    authController: async ({ request }, use, testInfo) => {
        await use(new AuthController(request, CONFIG.apiUrl, testInfo));
    },
});
export { expect } from '@playwright/test';
