import React, { useState } from "react";
import styled from "@emotion/styled";
import { StatsType } from "../pages/Stats";
import BarChart from "./BarChart";
import AreaChart from "./AreaChart";

const Wrapper = styled.section`
  margin-top: 4rem;
  text-align: center;

  /* button {
    font-size: 1.25rem;
    margin-bottom: 1rem;
  } */

  button {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    color: var(--primary-500);
    font-size: 1.25rem;
    cursor: pointer;
    margin-bottom: 1rem;
  }

  h4 {
    text-align: center;
    margin-bottom: 0.75rem;
  }
`;

type Props = {
  applications: StatsType["applications"];
};

const ChartsContainer: React.FC<Props> = ({ applications }) => {
  const [chartVisible, setChartVisible] = useState(false);

  console.log(applications);

  const chartApplications = [...applications].reverse();

  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type="button" onClick={() => setChartVisible((prev) => !prev)}>
        {chartVisible ? "Area Chart" : "Bar Chart"}
      </button>
      {chartVisible ? (
        <BarChart applications={chartApplications} />
      ) : (
        <AreaChart applications={chartApplications} />
      )}
    </Wrapper>
  );
};
export default ChartsContainer;
