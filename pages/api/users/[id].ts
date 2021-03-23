import { admin } from '../../../firebase-admin';

export default async function handler(req, res) {
  const { query } = req;
  const user = { userName: 'hoge' };
  try {
    /* get user by uid */
    const user = await admin.auth()
      .getUser(query.id);
    res.status(201).json({ success: true, user });
  }
  catch (error) {
    res.status(400).json({ success: false });
  }
}
