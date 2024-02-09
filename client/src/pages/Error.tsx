import { Link, useRouteError } from "react-router-dom";
import styled from "@emotion/styled";

import image from "../assets/images/not-found.svg";

const Wrapper = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  img {
    max-width: 600px;
    display: block;
    margin-bottom: 3rem;
  }
  h3 {
    margin-bottom: 0.5rem;
  }
  p {
    line-height: 1.5; // ?
    margin-top: 0;
    margin-bottom: 1.5rem;
    color: var(--grey-500);
  }
  a {
    color: var(--primary-500);
    text-decoration: underline;
    text-transform: capitalize;
  }
`;

const Error: React.FC = () => {
  const error = useRouteError() as { status: number | undefined };
  console.log(error);

  if (error.status === 404) {
    return (
      <Wrapper className="full-page">
        <div>
          <img src={image} alt="" />
          <h3>Ohh! Page not found</h3>
          <p>We can't find the page you are looking for</p>
          <Link to="/dashboard">back home</Link>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper className="full-page">
      <h3>Something went wrong...</h3>
    </Wrapper>
  );
};
export default Error;
