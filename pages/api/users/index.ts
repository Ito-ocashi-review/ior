import { NextApiRequest, NextApiResponse } from 'next';
import { admin } from '../../../firebase-admin';

export default async function handler(req:NextApiRequest, res:NextApiResponse):Promise<void> {
  try {
    /* get user by uid */
    const user = await admin.auth()
      .getUser('1g9pg28YcHejj31jzJ7hwj6N7Ej1');
    res.status(201).json({ success: true, user });
  }
  catch (error) {
    res.status(400).json({ success: false });
  }
}
