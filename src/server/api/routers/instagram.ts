import axios from "axios";
import { type InstagramResponse } from "types/InstagramResponse.type";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const instagramRouter = createTRPCRouter({
  getProfile: publicProcedure
    .input(z.object({ username: z.string().min(1) }))
    .mutation(async ({ input }) => {
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://www.instagram.com/api/v1/users/web_profile_info/?username=${input.username}`,
        headers: {
          accept: "*/*",
          "accept-language": "en-US,en;q=0.9",
          priority: "u=1, i",
          referer: `https://www.instagram.com/${input.username}/`,
          "sec-ch-prefers-color-scheme": "dark",
          "sec-ch-ua":
            '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
          "sec-ch-ua-full-version-list":
            '"Chromium";v="134.0.6998.45", "Not:A-Brand";v="24.0.0.0", "Google Chrome";v="134.0.6998.45"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-model": '""',
          "sec-ch-ua-platform": '"macOS"',
          "sec-ch-ua-platform-version": '"15.0.0"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "user-agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
          "x-asbd-id": "359341",
          "x-csrftoken": "sCJPhE9gDbYBVf_h4TiN_q",
          "x-ig-app-id": "936619743392459",
          "x-ig-www-claim": "0",
          "x-requested-with": "XMLHttpRequest",
          "x-web-session-id": "9aeltt:ibd08x:dotwht",
        },
      };
      const res = await axios<InstagramResponse>(config);

      return res.data;
    }),
});
