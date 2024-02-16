import React from "react";
import "./Home.scss";
import SearchHome from "../../components/searchHome/SearchHome";
import PopServices from "../../components/PopServices/PopServices";
 
 
function Home() {
  return (
    <div className="home">
      <SearchHome/>
      <PopServices/>
      <div className="features">
        <div className="container">
          <div className="item">
            <h1>Freelance talent at your fingertips</h1>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Available for every budget
            </div>
            <p>
            Discover premium services for every budget. There are only project-based prices, not hourly charges.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Quality work!
            </div>
            <p>
            Locate the ideal freelancer and have them start working on your project right away.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Safe Payment Gateway anytime!
            </div>
            <p>
            Know up front how much you will always pay. You must first approve the job before your payment is given.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              24x7  customer support
            </div>
            <p>
            Discover premium services for every budget. There are no hourly fees—only project-based costs.
            </p>
          </div>
          <div className="item">
            <video src="./img/freelance.mp4" controls />
          </div>
        </div>
      </div>
      <div className="explore">
        <div className="container">
          <h1>Freelance Services</h1>
          <div className="items">
            <div className="item">
              <img
                src="./img/graphics-design.svg"
                alt=""
              />
              <div className="line"></div>
              <span>Graphics & Design</span>
            </div>
            <div className="item">
              <img
                src="./img/online-marketing.svg"
                alt=""
              />
              <div className="line"></div>
 
              <span>Digital Marketing</span>
            </div>
            <div className="item">
              <img
                src="./img/writing-translation.svg"
                alt=""
              />
              <div className="line"></div>
              <span>Writing & Translation</span>
            </div>
            <div className="item">
              <img
                src="./img/video-animation.svg"
                alt=""
              />
              <div className="line"></div>
              <span>Video & Animation</span>
            </div>
            <div className="item">
              <img
                src="./img/music-audio.svg"
                alt=""
              />
              <div className="line"></div>
              <span>Music & Audio</span>
            </div>
            <div className="item">
              <img
                src="./img/programming.svg"
                alt=""
              />
              <div className="line"></div>
              <span>Programming & Tech</span>
            </div>
            <div className="item">
              <img
                src="./img/business.svg"
                alt=""
              />
              <div className="line"></div>
              <span>Business</span>
            </div>
            <div className="item">
              <img
                src="./img/lifestyle.svg"
                alt=""
              />
              <div className="line"></div>
              <span>Lifestyle</span>
            </div>
            <div className="item">
              <img
                src="./img/data.svg"
                alt=""
              />
              <div className="line"></div>
              <span>Data</span>
            </div>
            <div className="item">
              <img
                src="./img/photography.svg"
                alt=""
              />
              <div className="line"></div>
              <span>Photography</span>
            </div>
          </div>
        </div>
      </div>
      <div className="features dark">
        <div className="container">
          <div className="item">
            <h1>
              Overview
            </h1>
            <h1>
              A business solution designed for <i>teams</i>
            </h1>
            <p>
              Upgrade to a curated experience packed with tools and benefits,
              dedicated to businesses
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Connect to freelancers with proven business experience
            </div>
 
            <div className="title">
              <img src="./img/check.png" alt="" />
              Get matched with the perfect talent by a customer success manager
            </div>
 
            <div className="title">
              <img src="./img/check.png" alt="" />
              Manage teamwork and boost productivity with one powerful workspace
            </div>
           
          </div>
          <div className="item">
            <img
              src="./img/freelance.jpeg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default Home;