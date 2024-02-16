import * as service from '../services/users-services.js';
import { setGetResponse, setErrorResponse, setPostResponse, setPutResponse, setDeleteResponse, setUnauthorizedResponse} from './response-handler.js';

export const find = async (request, response) => {
    try {
        const params = {...request.query};
        const user = await service.search(params);
        setGetResponse(user, response);
    } catch(err){
        setErrorResponse(err, response);
    }
}

export const post = async (request, response) => {
    try {
        const newUser = {...request.body};
        const user = await service.save(newUser);
        setPostResponse(user, response);
    } catch(err){
        setErrorResponse(err, response);
    }
}

export const get = async (request, response) => {
    try{
        const id = request.params.id;
        const user = await service.findById(id);
        setGetResponse(user, response);
    }catch(err){
        setErrorResponse(err, response);
    }
}

export const put = async (request, response) => {
    try{
        const id = request.params.id;
        const updatedUser = {...request.body};
        const user = await service.update(updatedUser, id);
        setPutResponse(user, response);
    }catch(err){
        setErrorResponse(err, response);        
    }
}

export const remove = async (request, response) => {
    try{
        const removeUser = await service.remove(request);
        if(removeUser===401){
            setUnauthorizedResponse(response);
        }else{
            setDeleteResponse({message:"User account deleted"},response);
        }
        
    }catch(err){
        setErrorResponse(err, response);        
    }
}

export const login = async (request, response) => {
    try {
        const { email, password } = request.body;
        const user = await service.login({ email, password });
        if (user) {
            setPostResponse(user, response);
        } else {
            response.status(400).json({ error: 'Invalid credentials' });
        }
      } catch (err) {
        setErrorResponse(err, response);
      }
}

export const getFreelancer = async (request, response) => {
    try {
        const freelancers = await service.getFreelancer();
        setGetResponse(freelancers, response);
      } catch (err) {
        setErrorResponse(err, response);   
      }
}

export const monthlyData = async (request, response) => {
    try {
        const data = await service.getMonthlyData();
        setGetResponse(data, response);
      } catch (err) {
        setErrorResponse(err, response);   
      }
}

export const userData = async (request, response) => {
    try {
        const data = await service.getUserData();
        setGetResponse(data, response);
      } catch (err) {
        setErrorResponse(err, response);   
      }
}