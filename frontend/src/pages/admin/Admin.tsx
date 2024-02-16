import React from 'react';
import MonthlyUsers from '../../components/monthlyUsers/MonthlyUsers';
import StatsBox from '../../components/statsBox/StatsBox';
import "./Admin.scss";
import { useQuery } from 'react-query';
import newRequest from "../../utils/newRequest";

const Admin: React.FC = () => {


  return (
    <div>
        <h1 className="wtext">Welcome Admin</h1>
        <MonthlyUsers />
        <StatsBox />        
    </div>
  );
};

export default Admin;
