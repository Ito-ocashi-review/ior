import mongoose from 'mongoose';

const SessionSheme = new mongoose.Schema({
  userId: String,
  accessToken: String,
});

export default mongoose.models.Session || mongoose.model('Session', SessionSheme);
