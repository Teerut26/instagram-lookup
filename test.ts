import { PlaywrightLaunchOptionsConfig } from "@/configs/common/PlaywrightLaunchOptionsConfig";
import { env } from "@/env";
import playwright, { type LaunchOptions } from "playwright-core";

const browser = await playwright.chromium.launch(PlaywrightLaunchOptionsConfig);
const context = await browser.newContext();
const page = await context.newPage();
await page.goto(`https://www.instagram.com/lalalalisa_m`);

const response = await page.waitForResponse((response) => {
    return response.url().includes("web_profile_info");
})

console.log(await response.json());

