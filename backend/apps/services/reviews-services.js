import { Review, JobPost } from "../models/models.js";

export const search = async (userId) => {
    const reviews = await Review.find({ userId }).exec();
    return reviews;
}

export const searchJobId = async (jobId) => {
  const reviews = await Review.find({ jobId: jobId }).exec();
  return reviews;
}

export const save = async (req) => {
  

    const newReview = new Review({
      jobId: req.body.jobId,
      userId: req.userId,
      rating: req.body.rating,
      comment: req.body.comment
    });

    const review = await Review.findOne({
      jobId: req.body.jobId,
      userId: req.userId,
    });

    if (review)
      return 403;
    await JobPost.findByIdAndUpdate(req.body.jobId, {
        $inc: { totalRating: req.body.rating, rating: 1 },
      });

    return await newReview.save();
}

export const update = async (updatedReview, id) => {
  const options = { new: true }; 
  const review = await Review.findByIdAndUpdate(id, updatedReview, options).exec();
  return review;
}

export const remove = async (id) => {
  const deletedReview = await Review.findByIdAndDelete(id).exec();
  return deletedReview;
}