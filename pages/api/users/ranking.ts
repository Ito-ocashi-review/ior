import { NextApiRequest, NextApiResponse } from 'next';
import Review from '../../../models/Review';
import dbConnect from '../../../utils/dbConnect';
import { admin } from '../../../firebase-admin';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  await dbConnect();

  try {
    const fetchedAllUsers = await admin.auth().listUsers(1000);
    const users = fetchedAllUsers.users;
    const usersWithTotalReviewsWrapedPromise = users?.map(async (user) => {
      const reviews = await Review.find({ userId: user.uid });
      return { userName: user.displayName, totalReviews: reviews.length };
    });

    let usersTotalReviews;
    if (usersWithTotalReviewsWrapedPromise) {
      usersTotalReviews = await Promise.all(usersWithTotalReviewsWrapedPromise);
    }

    const sortedusersTotalReviews = usersTotalReviews?.sort((a, b) => {
      return Number(b.totalReviews) - Number(a.evaluation);
    });

    res.status(201).json({ success: true, sortedusersTotalReviews });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
