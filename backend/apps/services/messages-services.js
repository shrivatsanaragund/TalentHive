import { Message, Conversation} from "../models/models.js";

export const save = async (request) => {
    const newMessage = new Message({
        conversationId: request.body.conversationId,
        userId: request.userId,
        description: request.body.description,
      });
      const savedMessage = await newMessage.save();
    await Conversation.findOneAndUpdate(
      { id: request.body.conversationId },
      {
        $set: {
          readBySeller: request.isSeller,
          readByBuyer: !request.isSeller,
          lastMessage: request.body.description,
        },
      },
      { new: true }
    );
    return savedMessage;
}

export const findById = async (request) => {
  const messages = await Message.find({ conversationId: request.params.id });
  return messages;
}