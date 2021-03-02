import mongoose from 'mongoose';

const ReviewScheme = new mongoose.Schema({
  evaluation: {
    type: Number,
    // required: true,
  },

  comment: String,

  sweetId: String,

  userName: String,
});

export default mongoose.models.Review || mongoose.model('Review', ReviewScheme);
