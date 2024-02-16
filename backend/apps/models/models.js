import mongoose from "mongoose";

const Schema = mongoose.Schema;


const userSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    country: { type: String, required: true },
    description: { type: String },
    skills: { type: String },
    certifications: { type: String },
    img: { type: String, required: false },
    isSeller: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    isActivated: { type: Boolean, default: false },
    token: { type: String}
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const jobPostSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    cost: { type: Number, required: true },
    duration: { type: String, required: true },
    totalRating: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    cat: { type: String, required: true },
    coverImage: { type: String, required: true },
    images: { type: [String], required: true },
    shortTitle: {
      type: String,
      required: true,
    },
    shortDesc: {
      type: String,
      required: true,
    },
    revisionTotal: {
      type: Number,
      required: true,
    },
    jobFeatures: {
      type: [String],
      required: false,
    },
    jobSales: {
      type: Number,
      default: 0,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const messageSchema = new Schema(
  {
    conversationId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const jobApplicationsSchema = new Schema(
  {
    //   id: { type: Number, required: true },
    jobId: { type: String, required: true },
    img: { type: String, required: false },
    title: { type: String, required: true },
    sellerId: { type: String, required: true },
    buyerId: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    payment_intent: {
      type: String,
      required: true,
    },
    cost: { type: Number, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const reviewSchema = new Schema(
  {
    //   id: { type: Number, required: true },
    jobId: { type: String, required: true },
    userId: { type: String, required: true },
    rating: { type: Number, min: 0.1, max: 5, required: true },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const categorySchema = new Schema(
  {
    //   id: { type: Number, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    skills: [{ type: String }],
  },
  {
    versionKey: false,
  }
);

const conversationSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    sellerId: {
      type: String,
      required: true,
    },
    buyerId: {
      type: String,
      required: true,
    },
    readBySeller: {
      type: Boolean,
      required: true,
    },
    readByBuyer: {
      type: Boolean,
      required: true,
    },
    lastMessage: {
      type: String,
      required: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
export const JobPost = mongoose.model("JobPost", jobPostSchema);
export const Message = mongoose.model("Message", messageSchema);
export const JobApplications = mongoose.model("JobApplications", jobApplicationsSchema);
export const Review = mongoose.model("Review", reviewSchema);
export const Category = mongoose.model("Category", categorySchema);
export const Conversation = mongoose.model("Conversation", conversationSchema);
