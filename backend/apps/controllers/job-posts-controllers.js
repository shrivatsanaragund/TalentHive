import * as service from '../services/job-posts-services.js';
import { setGetResponse, setErrorResponse, setPostResponse, setPutResponse, setDeleteResponse, setUnauthorizedResponse, setNotFoundResponse} from './response-handler.js';

export const find = async (request, response) => {
    try {
        const params = request.query;
        const jobPosts = await service.search(params);
        setGetResponse(jobPosts, response);
    } catch(err){
        setErrorResponse(err, response);
    }
}

export const post = async (request, response) => {
    try {
        const newJobPosts = {
            userId: request.userId,         // getting userId from JWT token
            ...request.body};
        const jobPosts = await service.save(newJobPosts);
        if(jobPosts!==null){
            setPostResponse(jobPosts, response);
        }else{
            response.status(500).json({ error: 'Something went Wrong!' });
        }
    } catch(err){
        setErrorResponse(err, response);
    }
}

export const get = async (request, response) => {
    try{
        const id = request.params.id;
        const jobPost = await service.findById(id);
        setGetResponse(jobPost, response);
    }catch(err){
        setErrorResponse(err, response);
    }
}

export const put = async (request, response) => {
    try{
        const id = request.params.id;
        const updatedJobPost = {...request.body};
        const jobPost = await service.update(updatedJobPost, id);
        setPutResponse(jobPost, response);
    }catch(err){
        setErrorResponse(err, response);        
    }
}

export const remove = async (request, response) => {
    try{
        //const id = request.params.id;
        const removeJobPost = await service.remove(request,response);
        if(removeJobPost === 404){
            setNotFoundResponse(response);
        }else if(removeJobPost === 403){
            setUnauthorizedResponse(response);
        }else{
            setDeleteResponse({},response);
        }
        
    }catch(err){
        setErrorResponse(err, response);        
    }
}