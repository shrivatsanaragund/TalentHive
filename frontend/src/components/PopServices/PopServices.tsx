// import React, { useState, useEffect } from 'react';
// import './PopServices.scss';

// type PopServicesState = {
//   visibleServices: { id: number }[];
//   startIndex: number;
// };


// const totalServices = 9; // Specify the total number of services
// const services = Array.from({ length: totalServices }, (_, index) => ({ id: index + 1 }));

// const PopServices: React.FC = () => {
//   const [state, setState] = useState<PopServicesState>({
//     visibleServices: services.slice(0, 5),
//     startIndex: 0,
//   });

//   const showNextServices = () => {
//     const newStartIndex = (state.startIndex + 1) % totalServices;
//     const endIndex = (newStartIndex + 5) % services.length;
//     const newVisibleServices = newStartIndex < endIndex ? services.slice(newStartIndex, endIndex) : services.slice(newStartIndex).concat(services.slice(0, endIndex));



//     setState({
//       ...state,
//       startIndex: newStartIndex,
//       visibleServices: newVisibleServices,
//     });
//   };

//   const showPrevServices = () => {
//     const newStartIndex = (state.startIndex - 1 + totalServices) % totalServices;
//     const endIndex = (newStartIndex + 5) % services.length;
//     const newVisibleServices = newStartIndex < endIndex ? services.slice(newStartIndex, endIndex) : services.slice(newStartIndex).concat(services.slice(0, endIndex));

//     setState({
//       ...state,
//       startIndex: newStartIndex,
//       visibleServices: newVisibleServices,
//     });
//   };

//   return (
//     <div className="pop-services-container">
//       <button className="pop-button" onClick={showPrevServices}>
//         &lt;
//       </button>


// <div className="service-cards" >
//   {state.visibleServices.map(service => (
//     <div key={service.id} className="service-card">
//       <div className="blog-card">
//       {service.id}
//         <img
//           src="https://fastly.picsum.photos/id/949/1200/800.jpg?hmac=mW-_YmIqUMbyF5ydxz0QPn1GHneBWJEVlNCValTT5xw"
//           alt="white palace ceiling view"
//         />
//         <p className="blog-label">Technology</p>
  
//       </div>
//     </div>
//   ))}
// </div>


//       <button className="pop-button" onClick={showNextServices}>
//         &gt;
//       </button>
//     </div>
//   );
// };

// export default PopServices;


import React, { useState, useEffect } from 'react';
import './PopServices.scss';

type PopServicesState = {
  visibleServices: { id: number }[];
  startIndex: number;
  isTransitioning: boolean;
};


const totalServices = 9; // Specify the total number of services
const services = Array.from({ length: totalServices }, (_, index) => ({ id: index + 1 }));

const PopServices: React.FC = () => {
  const [state, setState] = useState<PopServicesState>({
    visibleServices: services.slice(0, 5),
    startIndex: 0,
    isTransitioning: false,
  });
  
  const getImgLabel= [
    'graphic.png',
    'program.png',
    'digitalmarket.png',
    'videoandanimation.png',
    'writentranslate.png',
    'musicnrec.png',
    'businessimg.png',
    'dataimg.png',
    'photoimg.png',
];

    const getBlogLabel= [
       'Graphics & Design',
       'Programming & Tech',
       'Digital Marketing',
       'Video and Animation',
       'Writing and Translation',
       'Music & Audio',
       'Business',
       'Data',
       'Photography',
];
  const showNextServices = () => {
    setState({
      ...state,
      isTransitioning: true,
    });

    setTimeout(() => {
    const newStartIndex = (state.startIndex + 1) % totalServices;
    const endIndex = (newStartIndex + 5) % services.length;
    const newVisibleServices = newStartIndex < endIndex ? services.slice(newStartIndex, endIndex) : services.slice(newStartIndex).concat(services.slice(0, endIndex));



    setState({
      ...state,
      startIndex: newStartIndex,
      visibleServices: newVisibleServices,
      isTransitioning: false,
    });
  }, 300);
  };

  const showPrevServices = () => {

    setState({
      ...state,
      isTransitioning: true,
    });

    setTimeout(() => {
    const newStartIndex = (state.startIndex - 1 + totalServices) % totalServices;
    const endIndex = (newStartIndex + 5) % services.length;
    const newVisibleServices = newStartIndex < endIndex ? services.slice(newStartIndex, endIndex) : services.slice(newStartIndex).concat(services.slice(0, endIndex));

    setState({
      ...state,
      startIndex: newStartIndex,
      visibleServices: newVisibleServices,
    });
  }, 300);
  };

  return (
    <div className="pop-services-container">
      <button className="pop-button pop-button-left" onClick={showPrevServices}>
        &lt;
      </button>


<div className={`service-cards ${state.isTransitioning ? 'transitioning' : ''}`} >
  {state.visibleServices.map(service => (
    <div key={service.id} className="service-card">
      <div className="blog-card">
        <img
          src={`./img/${getImgLabel[service.id-1]}`}
          alt="white palace ceiling view"
        />
        <p className="blog-label">{getBlogLabel[service.id-1]}</p>
  
      </div>
    </div>
  ))}
</div>


      <button className="pop-button pop-button-right" onClick={showNextServices}>
        &gt;
      </button>
    </div>
  );
};

export default PopServices;
