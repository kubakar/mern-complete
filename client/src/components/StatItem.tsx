import Wrapper from "../assets/wrappers/StatItem";

type Props = {
  title: string;
  icon: React.ReactNode;
  count?: number;
  color?: string;
};

const StatItem: React.FC<Props> = ({ count, icon, title, color }) => {
  return (
    <Wrapper color={color}>
      <header>
        <span className="count">{count}</span>
        <span className="icon">{icon}</span>
      </header>
      <span className="title">{title}</span>
    </Wrapper>
  );
};

StatItem.defaultProps = {
  count: 0,
};

export default StatItem;
