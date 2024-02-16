import { JobApplications, JobPost, User } from "../models/models.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const search = async (params = {}) => {
    const users = await User.find(params).exec();
    return users;
}

export const save = async (newUser) => {
    const user = new User(newUser);
    return await user.save();
}

export const findById = async (id) => {
    const user = await User.findById(id).exec();
    return user;
}

export const update = async (updatedUser, id) => {
    const options = { new: true }; 
    const user = await User.findByIdAndUpdate(id, updatedUser, options).exec();
    return user;
}

export const remove = async (request) => {
    const id = request.params.id;
    const user = await User.findById(id);
    if(request.userId !== id){
        return 401;
    }         
    return await User.findByIdAndDelete(id).exec();
}

export const login = async ({ email, password }) => {
    return await User.findOne({ email, password }).exec();
}

export const getFreelancer = async () => {
    return await User.find({ role: "freelancer" }).exec();
}

export const getUserData = async () => {
    const sellerCountPromise = User.countDocuments({ isSeller: true });
    const userCountPromise = User.countDocuments({ isSeller: false });
    const jobCountPromise = JobPost.countDocuments();

    const [sellerCount, userCount, jobCount] = await Promise.all([
        sellerCountPromise,
        userCountPromise,
        jobCountPromise,
      ]);

    return { sellerCount, userCount, jobCount };
}

export const getMonthlyData = async () => {
    const users = await User.find().sort({ createdAt: 1 }).exec();

    const groupedData = {};
    let cumulativeUsers = 0;
  
    users.forEach((user) => {
      const userDate = new Date(user.createdAt);
      const month = moment(userDate).format('MMMM');
  
      // Check if the user's creation date is before or equal to the current date
      if (userDate <= new Date()) {
        if (!groupedData[month]) {
          groupedData[month] = { users: 0, new_users: 0 };
        }
  
        cumulativeUsers++;
        groupedData[month].users = cumulativeUsers; // Set cumulative total users for the month
        groupedData[month].new_users++; // Increment new users for the month
      }
    });

    const allMonths = moment.months(); // Get an array of all months

    const monthlyData = allMonths.map((month) => ({
      month: month,
      users: groupedData[month] ? groupedData[month].users : 0,
      new_users: groupedData[month] ? groupedData[month].new_users : 0,
    }));
    const sellerCountPromise = User.countDocuments({ isSeller: true });
    const userCountPromise = User.countDocuments({ isSeller: false });
    const jobCountPromise = JobPost.countDocuments();

    const [sellerCount, userCount, jobCount] = await Promise.all([
        sellerCountPromise,
        userCountPromise,
        jobCountPromise,
      ]);

  return {monthlyData, sellerCount, userCount, jobCount};
}