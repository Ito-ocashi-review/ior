import { NextApiRequest, NextApiResponse } from 'next';
import Sweet from '../../../models/Sweet';
import Review from '../../../models/Review';
import dbConnect from '../../../utils/dbConnect';
import { admin } from '../../../firebase-admin';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  await dbConnect();

  try {
    const usersObject = await admin.auth().listUsers(1000);
    const users = usersObject.users;
    const usersRanking = users?.map(async (user) => {
      const reviews = await Review.find({ userId: user.uid });
      console.log(reviews);
    });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
