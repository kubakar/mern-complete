import styled from "@emotion/styled";

import FormRow from "./FormRow";
import FormRowSelect from "./FormSelectRow";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { JobStatus, JobType } from "../../../src/utils/constants";
import { Form, Link, useSubmit } from "react-router-dom";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    padding: 0.5rem;
  }
`;

type Props = {
  params: Record<string, string>;
};

// universal debounce
const debounce = (cb: CallableFunction, delay: number) => {
  let timeout: NodeJS.Timeout;

  return (...args: unknown[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};

const passForm = (cb: CallableFunction) => {
  return (e: ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { form },
    } = e;
    cb(form);
  };
};

const SearchContainer: React.FC<Props> = ({ params }) => {
  const submit = useSubmit();

  // hide filters when no query params passed - client reload (refreshes inputs nicely)
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!params.sort) setShow(false);
  }, [params]);

  const handleChange = (form: HTMLFormElement) => {
    console.log("form", form);
    submit(form); // method defaults to GET
  };

  // https://stackoverflow.com/questions/69830440/react-hook-usecallback-received-a-function-whose-dependencies-are-unknown-pass

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const searchDebounce = useCallback(debounce(handleChange, 500), []);
  // const searchDebounce = useMemo(() => debounce(handleChange, 500), []);

  return (
    <Wrapper>
      <Form className="form">
        <HeaderDiv>
          <h5 className="form-title">search form</h5>
          <button type="button" onClick={() => setShow((prev) => !prev)}>
            {show ? "Hide Filters" : "Show Filters"}
          </button>
        </HeaderDiv>

        {show && (
          <div className="form-center">
            <FormRow
              // onChange={(e) =>
              //   searchDebounce((e.currentTarget as HTMLInputElement).form)
              // }
              onChange={passForm(searchDebounce)}
              type="search"
              name="search"
              defaultValue={params.search ?? ""}
            ></FormRow>
            <FormRowSelect
              // onChange={(e) =>
              //   handleChange((e.currentTarget as HTMLInputElement).form)
              // }
              onChange={passForm(handleChange)}
              name="status"
              list={["all", ...Object.values(JobStatus)]}
              defaultValue={params.status ?? "all"}
            ></FormRowSelect>
            <FormRowSelect
              // onChange={(e) =>
              //   handleChange((e.currentTarget as HTMLInputElement).form)
              // }
              onChange={passForm(handleChange)}
              name="type"
              list={["all", ...Object.values(JobType)]}
              defaultValue={params.type ?? "all"}
            ></FormRowSelect>
            <FormRowSelect
              // onChange={(e) =>
              //   handleChange((e.currentTarget as HTMLInputElement).form)
              // }
              onChange={passForm(handleChange)}
              name="sort"
              list={["newest", "oldest"]} // add type
              defaultValue={params.sort ?? "newest"}
            ></FormRowSelect>
            {/* TEMP */}
            <Link reloadDocument to="../all-jobs" className="btn form-btn">
              Reset
            </Link>
          </div>
        )}
      </Form>
    </Wrapper>
  );
};
export default SearchContainer;
