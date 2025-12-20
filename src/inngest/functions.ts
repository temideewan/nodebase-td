import prisma from "@/lib/database";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world", },
  { event: "test/hello.world" },
  async ({ step }) => {
    // fetching video
    await step.sleep("Fetching video", "5s");
    // transcribing video
    await step.sleep("Transcribing video", "5s");
    // generating captions with AI
    await step.sleep("Generating captions with AI", "5s");
    step.run("create-workflow", () => {
      return prisma.workflow.create({
        data: {
          name: "workflow-from-inngest"
        }
      })
    })
  },
);
