import { test, expect } from '../../fixtures/ui-fixtures';
import {User} from "../../models/user";
import {CONFIG} from "../../config/config";

const user: User = {
    username: CONFIG.user.username,
    email: CONFIG.user.email,
    password: CONFIG.user.password
}

test.describe('login', function () {

    test("should login with valid creds", async ({page, loginPage, homePage}, testInfo)=> {
        await loginPage.login(user)
        await expect(homePage.header().accountButton(user.username)).toBeVisible()
        await expect(homePage.header().accountButton(user.username)).toHaveText(user.username)
        await expect(homePage.header().homeButton).toBeVisible()
        await expect(page).toHaveTitle(homePage.title)
    })

    /*tests("login to application", async ({ page }, testInfo)=> {
        await tests.step("open login page", async () => {
            await page.goto("/login", {waitUntil: "load"})
        })

        await tests.step('fill creds', async ()=> {


            await page.getByPlaceholder("Email").fill(user.email) //page.locator("input[type='email']").type(email, { delay: 10})
            await page.getByPlaceholder("Password").fill(user.password) //page.locator("input[type='password']").type(password, { delay: 10})
            await page.locator("button[type='submit'] >> text='Sign in'").click()
            //await page.getByRole("button", {name: "Sign in"}).click()
            //await page.locator('//button[@type="submit" and text()="Sign in"]').click()
            //await page.locator('//button[@type="submit" and contains(text(), "Sign in")]').click()

            //const loginResp = await page.waitForResponse(response => response.url().includes("/api/users/login"))
            await page.on("request", async (req) => {
                if (req.url().includes("/api/users/login")){
                    console.log(req.url())
                    console.log(req.postDataJSON())

                    const resp = await page.request.post(req.url(), { data: req.postDataJSON()})
                    console.log(await resp.text())
                }
            })

            const accountLink = await page.locator(`a[href*='${user.username}']`) //await page.locator(`a >> text='${username}'`)
            await expect(accountLink).toBeVisible()


            testInfo.annotations.push({type: "text", description: "hello world"})
            await testInfo.attach("tests step", {body: "Filling in creds", contentType: "text/html"})

        })
    })*/


})



