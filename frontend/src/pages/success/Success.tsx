import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";

const Success = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const payment_intent = params.get("payment_intent");

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await newRequest.put("/job-applications", { payment_intent });
        setTimeout(() => {
          navigate("/orders");
        }, 3000);
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();}, []);

  return (
    <div className="container">
        <p className="text">
            The payment was successful. You are being taken to the orders page. Please do not close the page...
        </p>
    </div>
  );
};

export default Success;
