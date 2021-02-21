import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const options = {
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Providers.Twitter({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
    }),
  ],

  // A database is optional, but required to persist accounts in a database
  // database: process.env.MONGO_URI,

  sessionMaxAge: 30 * 24 * 60 * 60 * 1000, // Expire sessions after 30 days of being idle
  sessionUpdateAge: 24 * 60 * 60 * 1000, // Update session expiry only if session was updated more recently than the last 24 hours
};

export default (req: NextApiRequest, res: NextApiResponse): Promise<void> => NextAuth(req, res, options);
