import React from "react";
import "./MonthlyUsers.scss";
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts";
import { useQuery } from 'react-query';
import newRequest from "../../utils/newRequest";

// const data = [
//   { month: "Jan", users: 1200 , new_users: 200},
//   { month: "Feb", users: 2100, new_users: 400 },
//   { month: "Mar", users: 800, new_users: 200 },
//   { month: "Apr", users: 1600, new_users: 100 },
//   { month: "May", users: 900 , new_users: 120},
//   { month: "Jun", users: 1700, new_users: 200 },
//   { month: "Jul", users: 1300 , new_users: 120},
//   { month: "Aug", users: 1500, new_users: 500 },
//   { month: "Sep", users: 1600, new_users: 300 },
//   { month: "Oct", users: 1400, new_users: 200 },
//   { month: "Nov", users: 1200, new_users: 160 },
//   { month: "Dec", users: 1300, new_users: 500 },
// ];


const MonthlyUsers = () => {
  const monthlyData = useQuery({
    queryFn: () => newRequest.get(`/users/data/monthly-data`).then((res) => res.data),
  });
  return (

    <div className="chart">
      <div className="title">User Details (Last 12 Months)</div>
      <ResponsiveContainer width="100%" aspect={4/1}>
        <AreaChart
          width={730}
          height={250}
          data={monthlyData.data?.monthlyData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="users" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#28691f" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#28691f" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="new_users" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#44e42f" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#44e42f" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="month" stroke="gray" />
            <YAxis/>
          <Tooltip />
          <Area
            type="monotone"
            dataKey="users"
            stroke="#28691f"
            fillOpacity={1}
            fill="url(#users)"
          />
          <Area
            type="monotone"
            dataKey="new_users"
            stroke="#44e42f"
            fillOpacity={1}
            fill="url(#new_users)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyUsers;
