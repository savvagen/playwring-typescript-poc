import {expect, test} from "../../fixtures/ui-fixtures";
import {CONFIG} from "../../config/config";


test("go to account page", async ({page, accountPage})=> {
    await expect(accountPage.headingUsername()).toBeVisible()
    await expect(accountPage.headingUsername()).toHaveText(CONFIG.user.username)
    await expect(accountPage.avatar()).toBeVisible()
})
