import React from "react";
import {
  ResponsiveContainer,
  BarChart as Chart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { StatsType } from "../pages/Stats";

type Props = {
  applications: StatsType["applications"];
};

const BarChart: React.FC<Props> = ({ applications }) => {
  return (
    <ResponsiveContainer height={300}>
      <Chart data={applications}>
        <CartesianGrid strokeDasharray="3"></CartesianGrid>
        <XAxis dataKey={"date"}></XAxis>
        <YAxis allowDecimals={false}></YAxis>
        <Tooltip contentStyle={{ background: "none" }} />
        <Bar dataKey={"count"} fill="#2cb1bc" type="monotone"></Bar>
        {/* <Bar dataKey={"count"} fill={theme.primary.color500}></Bar> */}
      </Chart>
    </ResponsiveContainer>
  );
};

export default BarChart;
