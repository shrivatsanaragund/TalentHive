

export const setGetResponse = (data, response) => {
    response.status(200)
        .json(data);
}

export const setLoginPostResponse = (data, token, status, response) => {
    response.cookie("accessToken", token, {httpOnly: true}).status(201)
        .json(data);
}
export const setPutResponse = (data, response) => {
    response.status(200)
        .json(data);
}

export const setPostResponse = (data, response) => {
    response.status(201)
        .json(data);
}

export const setDeleteResponse = (data, response) => {
    response.status(204)
        .json(data);
}

export const setUnauthorizedResponse = (response) => {
    response.status(401)
        .json({"message":"Not Authorized!"});
}

export const setNotFoundResponse = (response) => {
    response.status(404)
        .json({"message":"Not Found!"});
}



export const setErrorResponse = (err, response) => {
    console.log(err);
    response.status(500)
        .json({
            code : "ServiceError",
            message: "Error occured while processing your request."
        });
}