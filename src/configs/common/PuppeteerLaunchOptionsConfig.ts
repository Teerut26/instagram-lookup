import { env } from "@/env";
import { type LaunchOptions } from "puppeteer-core";

export const PuppeteerLaunchOptionsConfig: LaunchOptions = {
  args: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
  executablePath:
    process.platform === "win32"
      ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
      : process.platform === "linux"
        ? "/usr/bin/chromium-browser"
        : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: env.NODE_ENV === "development" ? false : true,
};
