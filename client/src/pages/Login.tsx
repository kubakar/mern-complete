import { Form, Link, useActionData, useNavigation } from "react-router-dom";
import Logo from "../components/Logo";
import FormRow from "../components/FormRow";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import SubmitBtn from "../components/SubmitBtn";
import { useEffect } from "react";

const Login: React.FC = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  //* Alternative approach where user data is saved from 'login' response

  // const actionData = useActionData() as AxiosResponse;
  // const navigate = useNavigate();
  // const { setUser } = useThemeContext();

  // useEffect(() => {
  //   if (actionData) {
  //     console.log(actionData.data);
  //     setUser(actionData.data.user);
  //     navigate("/dashboard");
  //   }
  // }, [actionData, setUser, navigate]);

  // example with displaying data
  const actionData = useActionData();
  useEffect(() => {
    console.log("actionData", actionData);
  }, [actionData]);

  return (
    <Wrapper className="full-page">
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
        <FormRow type="text" name="email" defaultValue="mike@gmail.com" />
        <FormRow type="password" name="password" />
        {/* <FormRow type="password" name="password" defaultValue="secret123" /> */}

        <SubmitBtn submitting={isSubmitting} />
        <p>
          Not a member yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Login;
