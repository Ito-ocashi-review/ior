import mongoose from 'mongoose';

const ReviewScheme = new mongoose.Schema({
  user: Object,

  evaluation: {
    type: Number,
    // required: true,
  },

  comment: String,
});

export default mongoose.models.Review || mongoose.model('Review', ReviewScheme);
