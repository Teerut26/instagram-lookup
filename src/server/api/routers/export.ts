import getCaptureService from "@/services/getCapture.service";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

export const exportRouter = createTRPCRouter({
  image: publicProcedure
    .input(z.object({ username: z.string().min(1) }))
    .mutation(async ({ input }) => {
      try {
        return getCaptureService(input);
      } catch (error) {
        throw error;
      }
    }),
});
