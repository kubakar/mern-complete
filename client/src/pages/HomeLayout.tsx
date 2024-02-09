import { Outlet } from "react-router-dom";

const HomeLayout: React.FC = () => {
  return (
    <>
      {/* <h1>Home Page (J v2)</h1>
      <nav>Navbar</nav>
      <hr /> */}
      <Outlet />
    </>
  );
};
export default HomeLayout;
