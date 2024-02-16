import React, { useState } from "react";
import "./SearchHome.scss";
import { useNavigate } from "react-router-dom";
import { useIndex } from "../../context/currentIndexCon";

const SearchHome: React.FC = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const backgrounds = [
    'searchman.png',
    'mainbg2.png',
    'random1.png',
    'mainbg1.png',
  ];
  const {currentIndex} = useIndex();
  const currentImage = backgrounds[currentIndex];

  const handleSubmit = () => {
    navigate(`/jobs?search=${input}`);
  };
  return (
    <div className={`home-section bg-${currentIndex}`}>
      <div className="left-content">
        <div className='home-text'>
        Find the right freelance service, right away
            </div>
      <div className="search-bar-container">
          <input type="text" placeholder="Search for any service..." className="search-bar" onChange={(e) => setInput(e.target.value)} />
          <button className={`search-button bg-${currentIndex}`} aria-label="Search"  onClick={handleSubmit}>
            Search
          </button>
        </div>
        <div className="text-and-buttons">
            <div className="text-pop">Popular:</div>
          <button className={`home-button  bg-${currentIndex}`}>Website Design</button>
          <button className={`home-button  bg-${currentIndex}`}>Wordpress</button>
          <button className={`home-button  bg-${currentIndex}`}>Logo Design</button>
        </div>
        
      </div>
      <div className={`right-content bg-${currentIndex}`}>
        <img src={`/img/${currentImage}`} alt="Person" className="person-image" />
      </div>
    </div>
  );
};

export default SearchHome;
