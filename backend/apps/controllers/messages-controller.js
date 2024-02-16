import * as service from '../services/messages-services.js';
import { setGetResponse, setErrorResponse, setPostResponse, setPutResponse, setDeleteResponse, setUnauthorizedResponse, setNotFoundResponse} from './response-handler.js';

export const post = async (request,response) => {
  try {
    const saveMessage = await service.save(request);
    setPostResponse(saveMessage, response);
  } catch (err) {
    setErrorResponse(err, response);
  }
};
export const find = async (request,response) => {
  try {
    const messages = await service.findById(request);
    setGetResponse(messages,response);
  } catch (err) {
    setErrorResponse(err, response);
  }
};
