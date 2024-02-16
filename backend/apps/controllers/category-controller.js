import * as service from '../services/category-services.js';
import { setGetResponse, setErrorResponse, setPostResponse, setPutResponse, setDeleteResponse} from './response-handler.js';

export const find = async (request, response) => {
    try {
        const params = {...request.query};
        const categories = await service.search(params);
        setGetResponse(categories, response);
    } catch(err){
        setErrorResponse(err, response);
    }
}

export const post = async (request, response) => {
    try {
        const newCategory = {...request.body};
        const categories = await service.save(newCategory);
        if(categories!==null){
            setPostResponse(categories, response);
        }else{
            response.status(404).json({ error: 'Not found!' });
        }
    } catch(err){
        setErrorResponse(err, response);
    }
}

export const get = async (request, response) => {
    try{
        const id = request.params.id;
        const category = await service.findById(id);
        setGetResponse(category, response);
    }catch(err){
        setErrorResponse(err, response);
    }
}

export const put = async (request, response) => {
    try{
        const id = request.params.id;
        const updatedcategory = {...request.body};
        const category = await service.update(updatedcategory, id);
        setPutResponse(category, response);
    }catch(err){
        setErrorResponse(err, response);        
    }
}

export const remove = async (request, response) => {
    try{
        const id = request.params.id;
        const removecategory = await service.remove(id);
        setDeleteResponse({},response);
    }catch(err){
        setErrorResponse(err, response);        
    }
}