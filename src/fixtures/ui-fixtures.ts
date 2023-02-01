import {expect, Page, test as base} from '@playwright/test';
import {LoginPage} from "../pages/login-page";
import {HomePage} from "../pages/home-page";
import {SettingsPage} from "../pages/settings-page";
import {AccountPage} from "../pages/account-page";
import {User} from "../models/user";
import {CONFIG} from "../config/config";


type PageFixtures = {
    loginPage: LoginPage,
    homePage: HomePage,
    settingsPage: SettingsPage,
    homePageAuthorized: HomePage,
    accountPage: AccountPage
}


const user: User = {
    username: CONFIG.user.username,
    email: CONFIG.user.email,
    password: CONFIG.user.password
}


async function authorize(page: Page, user: User, apiUrl: string): Promise<HomePage> {
    const homePage = new HomePage(page)
    await homePage.open()
    const resp = await page.request.post(`${apiUrl}/users/login`, {
        data: { user: { email: user.email, password: user.password} },
        headers: {"content-type": "application/json; charset=utf-8"}
    })
    await expect(resp).toBeOK()
    const jwtToken = JSON.parse(await resp.text()).user.token
    await page.evaluate(`localStorage.setItem('jwt', '${jwtToken}')`)
    // await page.reload()
    // await expect(homePage.header().accountButton(username)).toBeVisible()
    return homePage
}

// Extend base test by providing "todoPage" and "settingsPage".
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<PageFixtures>({
    loginPage: async ({ page }, use) => {
        // Set up the fixture.
        const loginPage = new LoginPage(page);
        await loginPage.open()
        await expect(loginPage.header().signInButton).toBeVisible()
        // Use the fixture value in the test.
        await use(loginPage);
        // Clean up the fixture. (Logout)
        // const settingsPage = new SettingsPage(page)
        // await settingsPage.open()
        // const homePage = await settingsPage.logout()
        // await expect(homePage.signInButton()).toBeVisible()
    },
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    settingsPage: async ({ page }, use) => {
        await authorize(page, user, CONFIG.apiUrl)
        const settingsPage = await new SettingsPage(page)
        await settingsPage.open()
        await expect(settingsPage.heading()).toBeVisible()
        await use(new SettingsPage(page))
    },
    homePageAuthorized: async ({ page }, use) => {
        // Set up the fixture.
        const homePage = await authorize(page, user, CONFIG.apiUrl)
        await homePage.open()
        await expect(homePage.header().accountButton(user.username)).toBeVisible()
        // Use the fixture value in the test.
        await use(homePage);
    },
    accountPage: async ({ page, homePage }, use) => {
        // Set up the fixture.
        await authorize(page, user, CONFIG.apiUrl)
        await new AccountPage(page, user.username).open()
        await expect(homePage.header().accountButton(user.username)).toBeVisible()
        // Use the fixture value in the test.
        await use(new AccountPage(page, user.username));
    }

});
export { expect } from '@playwright/test';
