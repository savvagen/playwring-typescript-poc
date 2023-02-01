import {expect, test} from "../../fixtures/ui-fixtures";
import {expect as assert} from "chai";
import {Article} from "../../pages/components/article";
import {User} from "../../models/user";
import {CONFIG} from "../../config/config";

const user: User = {
    username: CONFIG.user.username,
    email: CONFIG.user.password,
    password: CONFIG.user.password
}

test("should open home page", async ({page, homePageAuthorized, accountPage})=> {
    await expect(homePageAuthorized.header().accountButton(user.username)).toBeVisible()
    await homePageAuthorized.header().accountButton(user.username).click()
    await page.waitForLoadState("load")
    await accountPage.header().accountButton(user.username).screenshot()
})

test("should display articles", async ({homePageAuthorized})=> {
    await homePageAuthorized.globalFeed().click()
    await expect(homePageAuthorized.articlesColl().component).toHaveCount(10)
    await assert(await homePageAuthorized.articlesColl().size()).is.eq(10)
    const article: Article = await homePageAuthorized.articlesColl().get(0)
    await expect(article.heading).toBeVisible()
    await expect(article.heading).toHaveText("If we quantify the alarm, we can get to the FTP pixel through the online SSL interface!")
})

test('should open settings', async ({homePageAuthorized, settingsPage})=> {
    await homePageAuthorized.header().openSettings()
    await expect(settingsPage.heading()).toBeVisible()
    await expect(settingsPage.heading()).toHaveText("Your Settings")
})
