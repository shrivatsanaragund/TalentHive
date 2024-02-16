import React, { useEffect, useState } from "react";
import "./Pay.scss";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import newRequest from "../../utils/newRequest";
import { useParams } from "react-router-dom";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51OMQQmITATrEHt2LnNYzmiPADAaxCVuZA0440mvOzEk1pAnRRvCplesWLCwN6RNJJTcQOzRn4vAPSGvjkieneust00kPFe8Lf6"
);

const Pay = () => {
  const [clientSecret, setClientSecret] = useState<string | undefined>(undefined);

  const { id } = useParams();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await newRequest.post(
          `/job-applications/create-payment-intent/${id}`
        );
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  }, []);

  const appearance = {
    theme: 'stripe' as const, // Specify the type explicitly
  };

  return (
    <div className="pay">
      {clientSecret !== undefined && (
        <Elements options={{ clientSecret, appearance }} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Pay;
