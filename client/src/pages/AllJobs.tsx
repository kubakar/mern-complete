import JobsContainer from "../components/JobsContainer";
import SearchContainer from "../components/SearchContainer";
import { useLoaderData, useSubmit } from "react-router-dom";
import { JobInterface } from "../../../src/utils/constants";
import PaginationContainer from "../components/PaginationContainer";

const AllJobs: React.FC = () => {
  const { data, params } = useLoaderData() as {
    data: {
      jobs: JobInterface[];
      pages: number;
      currentPage: number;
      count: number;
    };
    params: Record<string, string>;
  };

  const submit = useSubmit();

  const { count, currentPage, jobs, pages } = data;

  console.log(count, currentPage, pages);

  // TBD keep qsp when job is edited/deleted

  // handler
  const onPageChange = (page: number) => {
    const newParams = { ...params, page };
    console.log("params", newParams);
    submit(newParams);
  };

  return (
    <>
      <SearchContainer params={params} />
      <JobsContainer jobs={jobs} count={count} />
      <PaginationContainer
        currentPage={currentPage}
        onPageChange={onPageChange}
        pages={pages}
      />
    </>
  );
};
export default AllJobs;
