import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from 'react-query';
import newRequest from "../../utils/newRequest";
import "./OrderCard.scss";

interface OrderCardProps {
  item: {
    _id: string;
    jobId: string;
    img: string;
    sellerId: string;
    buyerId: string;
    createdAt: string;
    cost: number;
  };
}

const OrderCard: React.FC<OrderCardProps> = ({ item }) => {
  const jobQuery = useQuery({
    queryKey: ['job', item.jobId],
    queryFn: () =>
      newRequest.get(`/job-posts/${item.jobId}`).then((res) => {
        console.log(res.data);
        return res.data;
      }),
  });

  const sellerQuery = useQuery({
    queryKey: ['user', item.sellerId],
    queryFn: () =>
      newRequest.get(`/users/${item.sellerId}`).then((res) => {
        console.log(res.data);
        return res.data;
      }),
  });

  const buyerQuery = useQuery({
    queryKey: ['user', item.buyerId],
    queryFn: () =>
      newRequest.get(`/users/${item.buyerId}`).then((res) => {
        console.log(res.data);
        return res.data;
      }),
  });

  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: '2-digit' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  };
  return (
    <Link to={currentUser.isSeller ? `/submitSubmission/${item._id}` : `/viewSubmission/${item._id}`} className="link">
      <div className="orderCard">
        <img src={item.img} alt="" className="orderImage" />
        <div className="info">
          {jobQuery.isLoading || sellerQuery.isLoading || buyerQuery.isLoading ? (
            "Loading..."
          ) : jobQuery.error || sellerQuery.error || buyerQuery.error ? (
            "Something went wrong!"
          ) : (
            <div className="userDetails">
              <p className="title"><strong>{jobQuery.data?.shortTitle}</strong></p>
              <p className="sellerText">{currentUser.isSeller ? `Buyer : ${buyerQuery.data?.username}` : `Seller : ${sellerQuery.data?.username}`}</p>
              <p className="description">{jobQuery.data?.shortDesc}</p>
              <div className="card-bot-container">
                <div className="description">Ordered on : {formatDate(item.createdAt)}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default OrderCard;
