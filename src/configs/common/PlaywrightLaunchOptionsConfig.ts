import { env } from "@/env";
import { type LaunchOptions } from "playwright-core";

export const PlaywrightLaunchOptionsConfig: LaunchOptions = {
  args: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
  executablePath:
    process.platform === "win32"
      ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
      : process.platform === "linux"
        // ? "/usr/bin/chromium-browser"
        ? "/usr/bin/chromium"
        : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: env.NODE_ENV === "development" ? false : true,
};
