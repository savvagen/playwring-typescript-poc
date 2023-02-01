import { PlaywrightTestConfig } from "@playwright/test"


type TestVar = "BASE_URL" | "ENV"

function getProperty(name: TestVar, defaultValue?: string): string | undefined {
    return process.env[`${name}`] != undefined ? process.env[`${name}`] : defaultValue
}


const config: PlaywrightTestConfig = {
    use: {
        //browserName: "chromium",
        headless: true,
        viewport: {
            width: 1280,
            height: 720
        },
        trace: "retain-on-failure",
        screenshot: "on",
        video: "retain-on-failure",
        ignoreHTTPSErrors: true,
        baseURL: getProperty("BASE_URL", "http://localhost:4100"), //"https://react-redux.realworld.io/#/?_k=1c33fq",
        navigationTimeout: 10000,
        actionTimeout: 10000,
    },
    expect: {
        timeout: 10000,
    },
    reporter: [
        ["html", {
            open: "always", // https://playwright.dev/docs/test-reporters#html-reporter
            //outputFolder: "playwright-report/html"
        }],
        ["list"]
    ],
    testDir: "src/test"
}
export default config;
