import {expect, test} from "../../fixtures/ui-fixtures";


test("go to account page", async ({page, homePage, settingsPage})=> {
    await expect(settingsPage.heading()).toBeVisible()
    await expect(settingsPage.heading()).toHaveText("Your Settings")
    await settingsPage.logout()
    await expect(homePage.signInButton()).toBeVisible()
})
