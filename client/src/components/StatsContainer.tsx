import React from "react";

import StatItem from "./StatItem";
import { LogOut, CheckSquare, Clock } from "react-feather";
import { StatsType } from "../pages/Stats";
import Wrapper from "../assets/wrappers/StatsContainer";

// this can be reshared
const themeJobs = {
  pending: {
    color: "#e9b949",
  },
  interview: {
    color: "#647acb",
  },
  declined: {
    color: "#d66a6a",
  },
};

type Props = {
  stats: StatsType["stats"];
};

const StatsContainer: React.FC<Props> = ({ stats }) => {
  const defStats = [
    {
      title: "pending applications",
      count: stats.pending,
      color: themeJobs.pending.color,
      //   status: themeJobs.pending.color,
      icon: <Clock size={48} />,
    },
    {
      title: "interviews scheduled",
      count: stats.interview,
      color: themeJobs.interview.color,

      //   status: themeJobs.interview.color,
      icon: <CheckSquare size={48} />,
    },
    {
      title: "jobs declined",
      count: stats.declined,
      color: themeJobs.declined.color,

      //   status: themeJobs.declined.color,
      icon: <LogOut size={48} />,
    },
  ];

  return (
    <Wrapper>
      {defStats.map((s) => (
        <StatItem
          count={s.count}
          title={s.title}
          key={s.title}
          icon={s.icon}
          color={s.color}
        />
      ))}
    </Wrapper>
  );
};
export default StatsContainer;
