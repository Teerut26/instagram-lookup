/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import puppeteer from "puppeteer-core";
import qs from "qs";
import { z } from "zod";

import { PuppeteerLaunchOptionsConfig } from "@/configs/common/PuppeteerLaunchOptionsConfig";
import { QSConfig } from "@/configs/common/QSConfig";
import _ from "lodash";
import { env } from "@/env";

export const getCaptureSchema = z.object({
  username: z.string().min(1),
});

export type GetCaptureInput = z.infer<typeof getCaptureSchema>;

const getCaptureService = async (props: GetCaptureInput) => {
  try {
    const width = 700;
    const selector = "#capture";

    const browser = await puppeteer.launch(PuppeteerLaunchOptionsConfig);
    const page = await browser.newPage();
    await page.setViewport({
      width: width,
      height: 0,
      deviceScaleFactor: 3,
    });

    const query = qs.stringify(
      {
        username: props.username,
      },
      QSConfig,
    );

    const url = new URL(
      `${env.WEB_URL}/capture/user${query}`,
    );

    await page.goto(url.toString(), {
      waitUntil: "networkidle2",
    });
    await page.waitForSelector(selector);
    const logo = await page.$(selector);
    const result = await logo?.screenshot({ type: "png", omitBackground: true });
    await page.close();
    await browser.close();
    const base64 = Buffer.from(result as Buffer).toString("base64");
    return "data:image/png;base64," + base64?.toString();
  } catch (error) {
    throw error;
  }
};

export default getCaptureService;
