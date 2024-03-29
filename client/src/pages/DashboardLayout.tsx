import {
  Outlet,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import styled from "@emotion/styled";

import BigSideBar from "../components/BigSidebar";
import Navbar from "../components/Navbar";
import { useCallback, useEffect, useState } from "react";
import Modal from "../components/Modal";
import NavLinks from "../components/NavLinks";
import { toast } from "react-toastify";
import axios, { isAxiosError } from "axios";
import Logo from "../components/Logo";
import { User } from "../../../src/utils/constants";
import Loading from "../components/Loading";

const Wrapper = styled.section`
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
  }
  .dashboard-page {
    width: 90%;
    margin: 0 auto;
    padding: 2rem 0;
  }
  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns: auto 1fr;
    }
  }
`;

const ModalWrapper = styled.aside`
  display: unset;

  @media (min-width: 992px) {
    display: none; // important - works with flex struct
  }

  .content {
    width: var(--fluid-width);
    height: 95vh;
  }
`;

const logout = async () => {
  try {
    const response = await axios.post("/api/v1/auth/logout");
    toast.success("Logout successful");
    return response;
  } catch (error) {
    // Is this needed in logout ?
    if (isAxiosError(error)) toast.error(error.response?.data.msg);
    else toast.error("Error");
  }
};

const DashboardLayout: React.FC = () => {
  const user = useLoaderData() as User["user"]; // user within context
  const { role } = user;

  const [sideBarVisible, showSideBar] = useState<boolean>(true);
  const [isAuthError, setIsAuthError] = useState<boolean>(false);
  const toggleSideBar = useCallback(() => showSideBar((prev) => !prev), []);
  const navigate = useNavigate();

  const navigation = useNavigation();
  // const isPageIdle = navigation.state === "idle";
  const isPageLoading = navigation.state === "loading"; // another type is 'submit'

  // only proceed with valid user - extra safety
  // if (user == null) throw new Error("No user");

  const logoutUser = async () => {
    await logout();
    navigate("/");
  };

  // REWORK THIS INTO CUSTOM HOOK !!
  // TEST
  // setup axios interceptors
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === 401) {
        console.log("!! AUTH ERROR !!");
        // logoutUser();
        setIsAuthError(true);
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    if (isAuthError) logoutUser();
  }, [isAuthError]);

  return (
    <Wrapper>
      <main className="dashboard">
        <ModalWrapper>
          <Modal visible={sideBarVisible} onChange={toggleSideBar}>
            <header>
              <Logo />
            </header>
            <NavLinks onClick={toggleSideBar} role={role} />
          </Modal>
        </ModalWrapper>
        <BigSideBar visible={sideBarVisible}>
          <NavLinks role={role} />
        </BigSideBar>
        <div>
          <Navbar
            user={user}
            onLogout={logoutUser}
            onMenuClick={toggleSideBar}
          />
          <div className="dashboard-page">
            {/* handling loading spinner globally */}
            {/* sth different has to be introduced eg. overlay, so main content is still rendered */}
            {isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
            {/* <Outlet context={{ user }} /> */}
          </div>
        </div>
      </main>
    </Wrapper>
  );
};
export default DashboardLayout;
