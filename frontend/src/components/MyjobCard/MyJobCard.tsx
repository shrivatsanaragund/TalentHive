import { useMutation, useQuery, useQueryClient } from "react-query";
import React from "react";
import { Link } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./MyJobCard.scss";
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
      newRequest.get(`/job-posts?userId=${item.userId}`).then((res) => {
        return res.data;
        
      }),
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/jobs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myJobs"]);
    },
  });

  return (
    <Link to={`/job/${item._id}`} className="link">
      <div className="MyjobCard">
        <img src={item.coverImage} alt="" className="jobImage" />
        <div className="info">
          {isLoading ? (
            "loading"
          ) : error ? (
            "Something went wrong!"
          ) : (
            <div className="user">
              <div className="userDetails">
              <p className="title"><strong>{item.shortTitle}</strong></p>
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
          <p className="description">{item.shortDesc}</p>
          </div>
        
      </div>
    </Link>
  );
};

export default JobCard;
