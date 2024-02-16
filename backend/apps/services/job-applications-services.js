import { JobApplications, User, JobPost } from "../models/models.js";
import Stripe from "stripe";

export const search = async (request) => {
    //Search function to retrieve all the job applications
    const jobApplicationPosts = await JobApplications.find({
      ...(request.isSeller ? { sellerId: request.userId } : { buyerId: request.userId }),
      isCompleted: true,
    }).exec();
    return jobApplicationPosts;
}

export const save = async (request) => {
    const stripe = new Stripe(process.env.STRIPE);
    const job = await JobPost.findById(request.params.jobId);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: job.cost * 100, // multiply by 100 to calculate in dollars else it takes cents
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    const jobApplicationsPost = new JobApplications({
      jobId: request.params.jobId,
      img: job.coverImage,
      title: job.title,
      buyerId: request.userId,
      sellerId: job.userId,
      cost: job.cost,
      payment_intent: paymentIntent.id
    });

    // const user = await User.findById(jobApplicationsPost.userId);
    // if (!user) {
    //   return null;
    // }
    // user.jobApplication.push(jobApplicationsPost._id);
    // await user.save();
    //const user = new JobPost(newJobPost);
    await jobApplicationsPost.save();
    return {clientSecret : paymentIntent.client_secret}
}

export const findById = async (id) => {
    //Function to find the jobApplication by jobApplicationID
    const jobApplicationsPost = await JobApplications.findById(id).exec();
    return jobApplicationsPost;
}

export const update = async (updatedJobApplicationPost, id) => {
    //Function to update the jobApplication by jobApplicationID
    const options = { new: true }; 
    const jobApplicationsPost = await JobApplications.findByIdAndUpdate(id, updatedJobApplicationPost, options).exec();
    return jobApplicationsPost;
}

export const updatePayment = async (request) => {
  //Function to update the jobApplication payment status
  const jobApplication = await JobApplications.findOneAndUpdate(
    {
      payment_intent: request.body.payment_intent,
    },
    {
      $set: {
        isCompleted: true,
      },
    },
    { new: true }
  );
  return jobApplication;
}

export const remove = async (id) => {
    //Function to delete the jobApplication by jobApplicationID
    const jobApplicationsPost = await JobApplications.findById(id);
    if (!jobApplicationsPost) {
      return res.status(404).json({ error: 'Job post not found' });
    }
    const userId = jobApplicationsPost.userId;
    // Remove the job application post from JobPostApplication collection
    const deletedJobApplicationPost = await JobApplications.findByIdAndDelete(id).exec();
    if (deletedJobApplicationPost) {
      // Remove the job Application post ID from the user's jobPostapplication array
      const user = await User.findById(userId);
      if (user) {
        user.jobApplication.pull(id);
        await user.save();
      }
    return deletedJobApplicationPost;
    }
}




