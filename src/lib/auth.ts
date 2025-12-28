import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { checkout, polar, portal } from '@polar-sh/better-auth';
import prisma from './database';
import { polarClient } from './polar';
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  user: {
    modelName: 'user',
  },
  session: {
    modelName: 'session',
  },
  account: {
    modelName: 'account',
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  plugins: [
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          products: [
            {
              productId: '5d4c2121-1cbc-424f-9464-cd8ef99c4446',
              slug: 'nodebase-pro',
            },
          ],
          successUrl: process.env.POLAR_SUCCESS_URL,
          authenticatedUsersOnly: true,
        }),
        portal(),
      ],
    }),
  ],
});
