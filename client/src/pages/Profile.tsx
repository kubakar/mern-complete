import { Form, useNavigation, useOutletContext } from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import FormRow from "../components/FormRow";
import SubmitBtn from "../components/SubmitBtn";
import { User } from "../../../src/utils/constants";

const Profile: React.FC = () => {
  const { user } = useOutletContext<User>();
  const navigation = useNavigation();
  console.log(user);

  return (
    <Wrapper>
      <Form method="POST" className="form">
        <h4 className="form-title">Profile</h4>
        <div className="form-center">
          <FormRow type="text" name="name" defaultValue={user.name} />
          <FormRow
            type="text"
            name="lastName"
            labelText="Last Name"
            defaultValue={user.lastName}
          />
          <FormRow type="text" name="email" defaultValue={user.email} />
          <FormRow type="text" name="location" defaultValue={user.location} />
          <SubmitBtn submitting={navigation.state === "submitting"} />
        </div>
      </Form>
    </Wrapper>
  );
};
export default Profile;
