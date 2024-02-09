import { Link, useNavigation, Form } from "react-router-dom";
import Logo from "../components/Logo";
import FormRow from "../components/FormRow";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import SubmitBtn from "../components/SubmitBtn";

const Register: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Wrapper className="full-page">
      {/* "post" is triggering react-router action */}
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow type="text" name="name" />
        <FormRow type="text" name="lastName" labelText="Last Name" />
        <FormRow type="text" name="location" />
        <FormRow type="text" name="email" />
        <FormRow type="password" name="password" />

        <SubmitBtn submitting={navigation.state === "submitting"} />
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Register;
