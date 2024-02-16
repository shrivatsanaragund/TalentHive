import * as service from '../services/conversations-services.js';
import { setGetResponse, setErrorResponse, setPostResponse, setPutResponse, setDeleteResponse, setUnauthorizedResponse, setNotFoundResponse} from './response-handler.js';


export const post = async (request,response) => {
  try {
    //console.log(request.body.to);
    // console.log(request);
    const saveConversation = await service.save(request);
    setGetResponse(saveConversation, response);
    } catch(err){
    setErrorResponse(err, response);
    }
};

export const put = async (request,response) => {
    try {
        const updatedConversation = await service.update(request);
        setPutResponse(updatedConversation, response);
        } catch(err){
        setErrorResponse(err, response);
    }
};

export const findSingle = async (request,response) => {
  try {
    const convo = await service.findS(request);
    if (!convo) return setNotFoundResponse(response);
    setGetResponse(convo, response);
  } catch (err) {
    setErrorResponse(err, response);
  }
};

export const find = async (request,response) => {
  try {
    const convos = await service.find(request);
    setGetResponse(convos, response);
  } catch (err) {
    setErrorResponse(err, response);
  }
};
