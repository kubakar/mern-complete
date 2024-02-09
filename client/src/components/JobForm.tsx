import FormRow from "../components/FormRow";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, useNavigation } from "react-router-dom";
import FormRowSelect from "./FormSelectRow";
import { JobInterface, JobStatus, JobType } from "../../../src/utils/constants";
import SubmitBtn from "./SubmitBtn";

type Props = {
  job: Omit<JobInterface, "createdBy">;
  action?: string;
  deletion?: boolean;
  title: string;
};

const JobForm: React.FC<Props> = ({
  job,
  // submitting,
  deletion,
  action,
  title,
}) => {
  const { company, location, position, status, type } = job;

  const navigation = useNavigation(); // used within component / not router page!

  return (
    <Wrapper>
      {/* ACTION has to be passed ! */}
      <Form
        method={deletion ? "DELETE" : "POST"}
        className="form"
        action={action}
      >
        {/* <Form method="post" className="form" action={undefined}> */}
        <h4 className="form-title">{title}</h4>
        <div className="form-center">
          <FormRow type="text" name="position" defaultValue={position} />
          <FormRow type="text" name="company" defaultValue={company} />
          <FormRow
            type="text"
            name="location"
            labelText="job location"
            defaultValue={location}
          />
          <FormRowSelect
            labelText="job status"
            name="status"
            list={Object.values(JobStatus)}
            defaultValue={status}
            // defaultValue={JobStatus.Pending}
          />
          <FormRowSelect
            labelText="job type"
            name="type"
            list={Object.values(JobType)}
            // defaultValue={JobType.Full}
            defaultValue={type}
          />
          <SubmitBtn submitting={navigation.state === "submitting"} />
        </div>
      </Form>
    </Wrapper>
  );
};

// JobForm.defaultProps = {
//   delete: "POST",
// };
export default JobForm;
