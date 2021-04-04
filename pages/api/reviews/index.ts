import { NextApiRequest, NextApiResponse } from 'next';
import Review from '../../../models/Review';
import dbConnect from '../../../utils/dbConnect';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { method, body } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        /* get all Reviews */
        const reviews = await Review.find({});
        res.status(201).json({ success: true, reviews });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const { data } = body;
        await Review.create({
          sweetId: data.sweetId,
          comment: data.comment,
          evaluation: data.evaluation,
          userId: data.userId,
        }); /* create a new model in the database */
        res.status(201).json({ success: true, data: Review });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
