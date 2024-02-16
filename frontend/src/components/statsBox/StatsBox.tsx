import React from 'react';
import './StatsBox.scss';
import productImg from './product.png';
import usersImg from './users.png';
import sellersImg from './seller.png';
import { useQuery } from 'react-query';
import newRequest from '../../utils/newRequest';


const StatsBox: React.FC = () => {
  const userData = useQuery({
    queryFn: () => newRequest.get(`/users/data/user-data`).then((res) => res.data),
  });
  return (
    <div className="stats-box">
      <div className="stat">
        <img src={usersImg} alt="Users" />
        <div className="box-content">
          <h3 className="box-text">Total Users</h3>
          <p>{userData.data?.userCount}</p>
        </div>
      </div>
      <div className="stat">
        <img src={sellersImg} alt="Sellers" />
        <div className="box-content">
          <h3 className="box-text">Total Freelancers</h3>
          <p>{userData.data?.sellerCount}</p>
        </div>
      </div>
      <div className="stat">
        <img src={productImg} alt="Products" />
        <div className="box-content">
          <h3 className="box-text">Total Products</h3>
          <p>{userData.data?.jobCount}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsBox;
