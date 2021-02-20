import Sweet from '../../../models/Sweet';
import dbConnect from '../../../utils/dbConnect';

export default async function handler(req, res) {
  const { method, body } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        /* get all sweets */
        const sweets = await Sweet.find({});
        res.status(201).json({ success: true, sweets });
      }
      catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const sweet = await Sweet.create(
          { name: body.name },
        ); /* create a new model in the database */
        res.status(201).json({ success: true, data: sweet });
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
