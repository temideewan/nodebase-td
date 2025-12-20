import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { inngest } from '@/inngest/client';
import { protectedProcedure, createTRPCRouter } from '../init';
import prisma from '@/lib/database';
import z from 'zod';
export const appRouter = createTRPCRouter({
  testAi: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: 'execute/ai',
    });
    return { success: true, message: 'Job Queued.' };
  }),
  getWorkflows: protectedProcedure.query(({ ctx }) => {
    return prisma.workflow.findMany({});
  }),
  createWorkflow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: 'test/hello.world',
      data: {
        email: 'temideewan@mail.com',
      },
    });
    return { success: true, message: 'Job Queued.' };
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
