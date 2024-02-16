import { Category } from "../models/models.js";

export const search = async (params = {}) => {
    const categories = await Category.find(params).exec();
    return categories;
}

export const save = async (newCategory) => {
    const category = new Category(newCategory);
    return await category.save();
}

export const findById = async (id) => {
    const category = await Category.findById(id).exec();
    return category;
}

export const update = async (updatedCategory, id) => {
    const options = { new: true }; 
    const category = await Category.findByIdAndUpdate(id, updatedCategory, options).exec();
    return category;
}

export const remove = async (id) => {
  
    // Remove the job post from JobPost collection
    const deletedCategory = await Category.findByIdAndDelete(id).exec();
    
    return deletedCategory;
    
}