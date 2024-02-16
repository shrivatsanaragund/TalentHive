import { JobPost, User } from "../models/models.js";

export const search = async (params) => {
  const filters = {
    ...(params.userId && { userId: params.userId }),
    ...(params.cat && { cat: params.cat }),
    ...((params.min || params.max) && {
      cost: {
        ...(params.min && { $gt: params.min }),
        ...(params.max && { $lt: params.max }),
      },
    }),
    ...(params.search && { title: { $regex: params.search, $options: "i" } }),
  };
    const jobPosts = await JobPost.find(filters).sort({ [params.sort]: -1 }).exec();
    return jobPosts;
}

export const save = async (newJobPost) => {
    const jobPost = new JobPost(newJobPost);
    // const user = await User.findById(jobPost.userId);
    // if (!user) {
    //   return null;
    // }
    // user.jobPost.push(jobPost._id);
    //await user.save();
    //const user = new JobPost(newJobPost);
    return await jobPost.save();
}

export const findById = async (id) => {
    const jobPost = await JobPost.findById(id).exec();
    return jobPost;
}

export const update = async (updatedJobPost, id) => {
    const options = { new: true }; 
    const jobPost = await JobPost.findByIdAndUpdate(id, updatedJobPost, options).exec();
    return jobPost;
}

export const remove = async (request,response) => {
    const id = request.params.id;
    const jobPost = await JobPost.findById(id);
    if (!jobPost) {
      return 404;
    }
    // console.log(jobPost.userId);
    // console.log(request.userId);
    if(jobPost.userId.toString() !== request.userId){
      return 403; // compare if token userID and jobPost userID matches
    }
    const deletedJobPost = await JobPost.findByIdAndDelete(id).exec();
    return deletedJobPost;
}