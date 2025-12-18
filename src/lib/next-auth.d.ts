import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username?: string; // Add username here
      twoFactorEnabled: boolean;
      twoFactorVerified: boolean;
      step: number;
      role: string;
      statut?: boolean;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    username?: string; // Add username here
    twoFactorEnabled: boolean;
    twoFactorVerified?: boolean;
    role: string;
    step: number;
    statut?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username?: string; // Add username here
    twoFactorEnabled: boolean;
    twoFactorVerified: boolean;
    role: string;
    step: number;
    statut?: boolean;
  }
}
