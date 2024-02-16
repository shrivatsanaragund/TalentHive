import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from 'react-query';
import newRequest from "../../utils/newRequest";
import "./JobCard.scss";
import '@fortawesome/fontawesome-free/css/all.min.css';

interface JobCardProps {
  item: {
    _id: string;
    userId: string;
    coverImage: string;
    shortTitle: string;
    totalRating: number;
    rating: number;
    cost: number;
    shortDesc: string;
  };
}

const JobCard: React.FC<JobCardProps> = ({ item }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [item.userId],
    queryFn: () =>
      newRequest.get(`/users/${item.userId}`).then((res) => {
        return res.data;
      }),
  });

  return (
    <Link to={`/job/${item._id}`} className="link">
      <div className="jobCard">
        <img src={item.coverImage} alt="" className="jobImage" />
        <div className="info">
          {isLoading ? (
            "loading"
          ) : error ? (
            "Something went wrong!"
          ) : (
            <div className="user">
              <img src={data?.img || "/img/noavatar.jpg"} alt="" className="userImage" />
              <div className="userDetails">
                <span className="username">{data?.username}</span>
                <div className="rating">
                  <i className="fas fa-star icon"></i>
                  <span>
                    <strong>
                      {!isNaN(item.totalRating / item.rating) &&
                        Math.round(item.totalRating / item.rating)}
                    </strong>
                  </span>
                  <p >({item.totalRating} reviews)</p>
                </div>
              </div>
            </div>
          )}
          <p className="title"><strong>{item.shortTitle}</strong></p>
          <p className="description">{item.shortDesc}</p>
          <p className="colorB"><strong>PRICE FROM $ {item.cost}</strong></p>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
