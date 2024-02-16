import * as service from '../services/authentication-services.js';
import { setGetResponse, setErrorResponse, setPostResponse, setLoginPostResponse, setDeleteResponse} from './response-handler.js';

export const register = async (request, response) => {
    try {
        const user = await service.save(request);     
        setPostResponse(user, response);    
    } catch(err){
        setErrorResponse(err, response);
    }
}

export const login = async (request, response) => {
    try {
        const rep = await service.login(request);
        if(rep.status===404){
            response.status(404).json({message : "Wrong Username or Password!"});
        }else if(rep.status===400){
            response.status(400).json({message : "Wrong Username or Password!"});
        }else{
            setLoginPostResponse(rep.user, rep.token, rep.status,response);
            //response.cookie("accessToken", rep.token, {httpOnly: true}).status(201).json(rep.user);
        }
        
    } catch(err){
        setErrorResponse(err, response);
    }
}

export const logout = async (request, response) => {
    try {
        await service.logout(response);
    } catch(err){
        setErrorResponse(err, response);
    }
}

export const activate = async (request, response) => {
    try {
        const user = await service.activateAccount(request);
        const redirectUrl = 'http://localhost:3001/login?registrationSuccess=true';
        return response.redirect(redirectUrl);
    } catch(err){
        setErrorResponse(err, response);
    }
}