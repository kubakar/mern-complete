import { useLoaderData } from "react-router-dom";
import Wrapper from "../assets/wrappers/StatsContainer";
import StatItem from "../components/StatItem";
import { Briefcase, UserCheck } from "react-feather";

const Admin: React.FC = () => {
  const { jobs, users } = useLoaderData() as { jobs: number; users: number };

  return (
    <Wrapper>
      <StatItem
        title="jobs"
        count={jobs}
        color="#f59e0b"
        icon={<Briefcase size={48} />}
      />
      <StatItem
        title="users"
        count={users}
        color="#647acb"
        icon={<UserCheck size={48} />}
      />
    </Wrapper>
  );
};
export default Admin;
