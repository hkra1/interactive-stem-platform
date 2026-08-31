import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
// import { PostgresAdapter } from "@auth/pg-adapter";
// import { Pool } from "pg";

// Optional: enable database sessions later
// const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export const { handlers, signIn, signOut, auth } = NextAuth({
  // adapter: PostgresAdapter(pool),
  providers: [
    // Enable GitHub (or others) by setting AUTH_GITHUB_ID and AUTH_GITHUB_SECRET
    // GitHub({
    //   clientId: process.env.AUTH_GITHUB_ID,
    //   clientSecret: process.env.AUTH_GITHUB_SECRET,
    // }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnProtected = nextUrl.pathname.startsWith("/dashboard");
      if (isOnProtected) {
        if (isLoggedIn) return true;
        return false; // Redirect to login
      }
      return true;
    },
  },
  // trustHost: true, // useful behind reverse proxies
});
