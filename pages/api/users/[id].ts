import { NextApiRequest, NextApiResponse } from 'next';
import { admin } from '../../../firebase-admin';

export default async function handler(req:NextApiRequest, res:NextApiResponse):Promise<void> {
  const { query } = req;
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
