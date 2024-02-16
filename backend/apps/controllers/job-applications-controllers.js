import * as service from '../services/job-applications-services.js';
import { setGetResponse, setErrorResponse, setPostResponse, setPutResponse, setDeleteResponse} from './response-handler.js';

export const find = async (request, response) => {
    try {
        const params = {...request.query};
        const jobApplications = await service.search(request);
        setGetResponse(jobApplications, response);
    } catch(err){
        setErrorResponse(err, response);
    }
}

export const post = async (request, response) => {
    try {
        const cSecret = await service.save(request);
        if(cSecret!==null){
            setPostResponse(cSecret, response);
        }else{
            response.status(404).json({ error: 'User not found!' });
        }
    } catch(err){
        setErrorResponse(err, response);
    }
}

export const get = async (request, response) => {
    try{
        const id = request.params.id;
        const jobApplicationsPosts = await service.findById(id);
        setGetResponse(jobApplicationsPosts, response);
    }catch(err){
        setErrorResponse(err, response);
    }
}

export const put = async (request, response) => {
    try{
        const id = request.params.id;
        const updatedJobApplication = {...request.body};
        const jobApplicationsPosts = await service.update(updatedJobApplication, id);
        setPutResponse(jobApplicationsPosts, response);
    }catch(err){
        setErrorResponse(err, response);        
    }
}

export const confirmPayment = async (request, response) => {
    try{
        //const id = request.params.id;
        const jobApplicationsPosts = await service.updatePayment(request);
        setPutResponse(jobApplicationsPosts, response);
    }catch(err){
        setErrorResponse(err, response);        
    }
}

export const remove = async (request, response) => {
    try{
        const id = request.params.id;
        const removeJobApplication = await service.remove(id);
        setDeleteResponse({},response);
    }catch(err){
        setErrorResponse(err, response);        
    }
}