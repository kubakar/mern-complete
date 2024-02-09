import { useOutletContext } from "react-router-dom";

// type User = { user: { location: string } };

// data from server code
import { JobStatus, JobType, User } from "../../../src/utils/constants.ts";
import JobForm from "../components/JobForm.tsx";

const AddJob: React.FC = () => {
  const { user } = useOutletContext<User>();

  return (
    <JobForm
      title="add job"
      // no action passed - default/realtive path = "add-job"
      // submitting={navigation.state === "submitting"}
      job={{
        position: "Position",
        company: "",
        location: user.location, // user used from ctx
        status: JobStatus.Pending,
        type: JobType.Full,
      }}
    />
  );
};
export default AddJob;
