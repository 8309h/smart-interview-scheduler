import mongoose from 'mongoose';

const interviewerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      unique: true,
      index: true,
    },
    googleId: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
      index: true,
    },
    profilePicture: {
      type: String,
      trim: true,
    },
    encryptedRefreshToken: {
      type: String,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLoginAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

interviewerSchema.index({ email: 1, googleId: 1 });

const Interviewer = mongoose.model('Interviewer', interviewerSchema);
export default Interviewer;
