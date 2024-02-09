import styled from "@emotion/styled";
import { Navigation, Briefcase, Calendar, Info } from "react-feather";

import { JobInterface } from "../../../src/utils/constants";
import { Form } from "react-router-dom";
import JobInfo from "./JobInfo";
import day from "dayjs";
import { Dispatch } from "react";

const Wrapper = styled.article`
  background: var(--background-secondary-color);
  border-radius: var(--border-radius);
  /* display: grid; */
  /* grid-template-rows: 1fr auto; */
  box-shadow: var(--shadow-2);
  header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--grey-100);
    /* display: grid; */
    /* grid-template-columns: auto 1fr; */
    display: flex;
    /* gap: 1rem; */
    align-items: center;
  }
  .main-icon {
    width: 60px;
    height: 60px;
    display: grid;
    place-items: center;
    background: var(--primary-500);
    border-radius: var(--border-radius);
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--white);
    margin-right: 2rem;
  }
  .info {
    h5 {
      margin-bottom: 0.5rem;
    }
    p {
      margin: 0;
      text-transform: capitalize;
      letter-spacing: var(--letter-spacing);
      color: var(--text-secondary-color);
    }
  }
  .content {
    padding: 1rem 1.5rem;
  }
  .content-center {
    display: grid;
    margin-top: 1rem;

    grid-template-columns: 1fr;
    row-gap: 1.5rem;
    align-items: center;
    @media (min-width: 576px) {
      grid-template-columns: 1fr 1fr;
    }
  }
  .actions {
    margin-top: 1rem;
    display: flex;
    align-items: center;
  }
  .edit-btn,
  .delete-btn {
    height: 30px;
    font-size: 0.85rem;
    // bring link and button to same look&feel
    display: flex;
    align-items: center;
  }
  .edit-btn {
    margin-right: 0.5rem;
  }
`;

type Props = { job: JobInterface; onEdit: Dispatch<JobInterface> };

const Job: React.FC<Props> = ({ job, onEdit }) => {
  const { company, location, position, status, type, _id: id, createdAt } = job;

  // const date = day(createdAt).format("DD/MM/YYYY");
  const date = day(createdAt).format("MMM D, YYYY");

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<Navigation />} text={location} />
          <JobInfo icon={<Briefcase />} text={status} />
          <JobInfo icon={<Calendar />} text={date} />
          <JobInfo icon={<Info />} text={type} />
        </div>
        <footer className="actions">
          {/* <Link className="btn edit-btn" to={""}>
            Edit
          </Link> */}
          <button
            type="button"
            className="btn edit-btn"
            onClick={() => onEdit(job)}
          >
            Edit
          </button>
          <Form method="DELETE" action={`../delete-job/${id}`}>
            <button type="submit" className="btn delete-btn">
              Delete
            </button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
};
export default Job;
