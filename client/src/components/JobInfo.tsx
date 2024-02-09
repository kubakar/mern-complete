import styled from "@emotion/styled";
import { JobStatus } from "../../../src/utils/constants";

// new
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  .tag {
    border-radius: var(--border-radius);
    padding: 0.2rem 0.5rem;
  }

  .job-text {
    text-transform: capitalize;
  }
  /* .job-icon {
    font-size: 1rem;
    margin-right: 1rem;
    display: flex;
    align-items: center;
    svg {
      color: var(--text-secondary-color);
    }
  }
  .job-text {
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
  } */
`;

type Props = {
  icon: React.ReactNode;
  text: string;
};

const JobInfo: React.FC<Props> = ({ icon, text }) => {
  const appliedStyle = Object.values(JobStatus).includes(text as JobStatus)
    ? text
    : null;

  return (
    <Wrapper>
      {icon}
      <div
        className={`job-text ${appliedStyle ? [text, "tag"].join(" ") : ""}`}
      >
        {text}
      </div>
    </Wrapper>
  );
};
export default JobInfo;
