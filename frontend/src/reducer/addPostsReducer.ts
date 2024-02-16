export const INITIAL_STATE = {
    title: "",
    description: "",
    cost: 0,
    duration:"",
    totalRating: 0,
    rating:0,
    cat: "",
    coverImage: "",
    images: [],
    shortTitle: "",
    shortDesc: "",
    revisionTotal: 0,
    jobFeatures: [],
    jobSales:0,
  };


  export const addPostsReducer =(state,action) =>{
    switch (action.type) {
        case "CHANGE_INPUT":
          return {
            ...state,
            [action.payload.name]: action.payload.value,
          };

        case "ADD_IMAGES":
            return {
              ...state,
              coverImage: action.payload.coverImage,
              images: action.payload.images,
            };

        case "ADD_FEATURE":
                return {
                  ...state,
                  jobFeatures: [...state.jobFeatures, action.payload],
                };

        case "REMOVE_FEATURE":
            return {
                ...state,   
                jobFeatures: state.jobFeatures.filter(
                (jobFeature) => jobFeature !== action.payload
                    ),
                };

        default:
            return state;
              
  }
};