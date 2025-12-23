// import { TRPCError } from "@trpc/server";
import { inngest } from "@/inngest/client";
import prisma from "@/lib/database";
import { createTRPCRouter, protectedProcedure } from "../init";
export const appRouter = createTRPCRouter({
  testAi: protectedProcedure.mutation(async () => {
    // throw new TRPCError({
    //   code: "BAD_REQUEST",
    //   message: "something went wrong",
    // });
    await inngest.send({
      name: "execute/ai",
    });
    return { success: true, message: "Job Queued." };
  }),
  getWorkflows: protectedProcedure.query(({ ctx }) => {
    return prisma.workflow.findMany({});
  }),
  createWorkflow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "test/hello.world",
      data: {
        email: "temideewan@mail.com",
      },
    });
    return { success: true, message: "Job Queued." };
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
