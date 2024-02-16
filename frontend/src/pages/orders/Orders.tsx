import React, { useEffect, useRef } from "react";
import "./Orders.scss";
import OrderCard from "../../components/orderCard/OrderCard";
import { useQuery } from "react-query";
import newRequest from "../../utils/newRequest";

const Orders: React.FC = () => {

  const { isLoading, error, data } = useQuery({
    queryFn: () =>
      newRequest
        .get(
          `/job-applications`
        )
        .then((res) => res.data),
  });

  return (
    <div className="orders">
      <div className="container">
        <span className="breadcrumbs"><strong>Home &gt; Orders &gt;</strong></span>
        <h1>Orders</h1>
        <div className="cards">
          {isLoading
            ? "loading"
            : error
            ? "Something went wrong!"
            : (data as any[]).map((orders) => (
                <OrderCard key={orders?._id} item={orders} />
              ))}
        </div>
      </div>
    </div>
  );
}

export default Orders;
