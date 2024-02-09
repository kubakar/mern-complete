import React from "react";
import {
  ResponsiveContainer,
  AreaChart as Chart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { StatsType } from "../pages/Stats";

type Props = {
  applications: StatsType["applications"];
};

const AreaChart: React.FC<Props> = ({ applications }) => {
  return (
    <ResponsiveContainer height={400}>
      <Chart data={applications}>
        <CartesianGrid strokeDasharray="3"></CartesianGrid>
        <XAxis dataKey={"date"}></XAxis>
        <YAxis allowDecimals={true}></YAxis>
        <Tooltip contentStyle={{ background: "none" }} />
        <Area
          type="monotone"
          dataKey={"count"}
          fill="#bef8fd"
          // fill="#2cb1bc"
          //   fill={theme.primary.color500} // idea
        ></Area>
      </Chart>
    </ResponsiveContainer>
  );
};

export default AreaChart;
