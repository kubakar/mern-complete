import { useLoaderData } from "react-router-dom";
import StatsContainer from "../components/StatsContainer";
import ChartsContainer from "../components/ChartsContainer";

export type StatsType = {
  stats: Record<string, number>;
  applications: { count: number; data: string }[];
};

const Stats: React.FC = () => {
  const { applications, stats } = useLoaderData() as StatsType;

  return (
    <>
      <StatsContainer stats={stats} />
      {applications.length && <ChartsContainer applications={applications} />}
    </>
  );
};
export default Stats;
