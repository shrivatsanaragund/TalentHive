import * as service from '../services/reviews-services.js';
import { setGetResponse, setErrorResponse, setPostResponse, setPutResponse, setDeleteResponse} from './response-handler.js';

export const find = async (request, response) => {
    try {
      //  const params = {...request.query};
        const id = request.params.id;
        const reviews = await service.search(id);
        setGetResponse(reviews, response);
    } catch(err){
        setErrorResponse(err, response);
    }
}

export const post = async (request, response) => {
    try {
        const review = await service.save(request);
        if(review===403){
            response.status(403).json({ error: 'User Already has a review!' });
        }
        else if(review!==null){
            setPostResponse(review, response);
        }else{
            response.status(404).json({ error: 'Review not found!' });
        }
    } catch(err){
        setErrorResponse(err, response);
    }
}

export const put = async (request, response) => {
    try{
        const id = request.params.id;
        const updatedReview = {...request.body};
        const review = await service.update(updatedReview, id);
        setPutResponse(review, response);
    }catch(err){
        setErrorResponse(err, response);        
    }
}

export const remove = async (request, response) => {
    try{
        const id = request.params.id;
        const remove = await service.remove(id);
        setDeleteResponse({},response);
    }catch(err){
        setErrorResponse(err, response);        
    }
}

export const findReview = async (request, response) => {
    try {
      //  const params = {...request.query};
        const jobId = request.params.jobId;
        const reviews = await service.searchJobId(jobId);
        setGetResponse(reviews, response);
    } catch(err){
        setErrorResponse(err, response);
    }
}