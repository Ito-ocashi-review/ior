import mongoose from 'mongoose';

const SweetSheme = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name for this sweet.'],
  },
});

export default mongoose.models.Sweet || mongoose.model('Sweet', SweetSheme);
