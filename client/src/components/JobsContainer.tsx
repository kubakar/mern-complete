import styled from "@emotion/styled";
import { JobInterface } from "../../../src/utils/constants";
import Job from "./Job";
import { useRevalidator } from "react-router-dom";
import { useState } from "react";
import Modal from "./Modal";
import JobForm from "./JobForm";

const Wrapper = styled.section`
  margin-top: 4rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
  }
  .jobs {
    display: grid;
    grid-template-columns: 1fr;
    /* row-gap: 2rem; */
    gap: 2rem;
  }
  @media (min-width: 1120px) {
    .jobs {
      grid-template-columns: 1fr 1fr;
      /* gap: 2rem; */
    }
  }
`;

type Props = {
  jobs: JobInterface[];
  count: number;
};

const JobsContainer: React.FC<Props> = ({ jobs, count }) => {
  const { revalidate } = useRevalidator(); // we can force 'loader' to fire again

  const [selectedJob, setSelectedJob] = useState<JobInterface>();

  if (!jobs.length) return <h2>No jobs...</h2>;

  return (
    <Wrapper>
      <h5>{`${count} job${count > 1 && "s"}`}</h5>
      {selectedJob && ( // this will not be re-rendered now
        <Modal visible={true} onChange={() => setSelectedJob(undefined)}>
          <JobForm
            title="edit job"
            action={`../edit-job/${selectedJob._id}`} // put selected job state here
            job={{
              position: selectedJob.position,
              company: selectedJob.company,
              location: selectedJob.location,
              status: selectedJob.status,
              type: selectedJob.type,
            }}
          />
        </Modal>
      )}

      <button onClick={revalidate}>RELOAD</button>
      <div className="jobs">
        {jobs.map((j) => (
          // conversion of Mongo's ObjectId to plain string
          <Job key={j._id?.toString()} onEdit={setSelectedJob} job={j} />
        ))}
      </div>
    </Wrapper>
  );
};
export default JobsContainer;
