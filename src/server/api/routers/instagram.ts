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
          "x-ig-app-id": "936619743392459",
        },
      };
      const res = await axios<InstagramResponse>(config);

      return res.data;
    }),
});
