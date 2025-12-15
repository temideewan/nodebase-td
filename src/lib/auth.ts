import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./database";
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    user: {
      modelName: "user",
    },
    session: {
      modelName: "session",
    },
    account: {
      modelName: "account",
    },
    emailAndPassword: {
      enabled: true,
      autoSignIn: true,
    }
});
