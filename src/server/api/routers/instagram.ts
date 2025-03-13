/* eslint-disable @typescript-eslint/no-unsafe-return */
import axios from "axios";
import { type InstagramResponse } from "types/InstagramResponse.type";
import { z } from "zod";
import playwright from "playwright-core";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { PlaywrightLaunchOptionsConfig } from "@/configs/common/PlaywrightLaunchOptionsConfig";

export const instagramRouter = createTRPCRouter({
  getProfile: publicProcedure
    .input(z.object({ username: z.string().min(1) }))
    .mutation(async ({ input }) => {
      const browser = await playwright.chromium.launch(
        PlaywrightLaunchOptionsConfig,
      );

      try {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(`https://www.instagram.com/${input.username}`);

        const responseRaw = await page.waitForResponse((response) => {
          console.log(response.url());
          return response.url().includes("web_profile_info");
        });
        const response = (await responseRaw.json()) as InstagramResponse;

        await page.close();
        await browser.close();

        return response;
      } catch (error) {
        await browser.close();
        throw error;
      }
    }),
});
