import mongoose from 'mongoose';

const UserSheme = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name for this User.'],
  },
  image: {
    image: String,
  },
});

export default mongoose.models.User || mongoose.model('User', UserSheme);
