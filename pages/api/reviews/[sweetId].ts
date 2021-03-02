import Review from '../../../models/Review';
import dbConnect from '../../../utils/dbConnect';

export default async function handler(req, res) {
  const { method, query } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        /* get Reviews */
        const reviews = await Review.find({ sweetId: query.sweetId });
        res.status(201).json({ success: true, reviews });
      }
      catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
