import {Conversation} from "../models/models.js";

export const save = async (request) => {
    // console.log(request.isSeller ? request.userId + request.body.to : request.body.to + request.userId);
    // console.log(request.body.to);
    // console.log(request.userId);
    // console.log(request);
    const newConversation = new Conversation({
        id: request.isSeller ? request.userId + request.body.to : request.body.to + request.userId,
        sellerId: request.isSeller ? request.userId : request.body.to,
        buyerId: request.isSeller ? request.body.to : request.userId,
        readBySeller: request.isSeller,
        readByBuyer: !request.isSeller,
      });
    
    const saveConversation = new Conversation(newConversation);
    return await saveConversation.save();
}

export const update = async (request) => {
    const updatedConversation = await Conversation.findOneAndUpdate(
        { id: request.params.id },
        {
          $set: {
            ...(request.isSeller ? { readBySeller: true } : { readByBuyer: true }),
          },
        },
        { new: true }
      );
      return updatedConversation;   
}

export const findS = async (request) => {
  const id = request.params.id;
  const conversation = await Conversation.findOne({id : id});
  return conversation; 
}

export const find = async (request) => {
  const convos = await Conversation.find(request.isSeller ? { sellerId: request.userId } : { buyerId: request.userId }).sort({ updatedAt: -1 });
  return convos; 
}