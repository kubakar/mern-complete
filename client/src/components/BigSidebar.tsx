import styled from "@emotion/styled";

import Logo from "./Logo";

const Wrapper = styled.aside`
  display: none;
  @media (min-width: 992px) {
    display: block;
    box-shadow: 1px 0px 0px 0px rgba(0, 0, 0, 0.1);
  }
  .sidebar-container {
    background: var(--background-secondary-color);
    height: 100%; // bugfix
    width: 250px;
    min-height: 100vh;
    margin-left: -250px;
    transition: margin-left 0.3s ease-in-out;
  }
  .content {
    position: sticky;
    top: 0;
    padding-left: 2.5rem;
  }
  .show-sidebar {
    margin-left: 0;
  }
  header {
    height: 6rem;
    display: flex;
    align-items: center;
    /* padding-left: 2.5rem; */
  }

  /* extra effect */
  .nav-link:hover {
    padding-left: 0.5rem;
  }
  .pending {
    /* background: var(--background-color); */
    /* This is preventing react-router class adding its own class. We have another 'pending' class in css which needs to be silenced here */
    background: var(--background-secondary-color);
  }
  /* } */
`;

type Props = {
  visible: boolean;
  children: React.ReactNode;
};

const BigSideBar: React.FC<Props> = ({ visible, children }) => {
  return (
    <Wrapper>
      <div className={`sidebar-container ${visible && "show-sidebar"}`}>
        <div className="content">
          <header>
            <Logo />
          </header>
          {children}
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSideBar;
