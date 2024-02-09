import { AlignLeft, User, ChevronDown, Sun, Moon } from "react-feather";
import styled from "@emotion/styled";

import Logo from "./Logo";
import { useState } from "react";
import { useThemeContext } from "../context/themeContext";

const Wrapper = styled.nav`
  height: var(--nav-height);
  display: flex;
  justify-content: center;
  box-shadow: 0 1px 0px 0px rgba(0, 0, 0, 0.1);
  /* background: var(--white); */
  background: var(--background-secondary-color);

  .logo {
    /* display: flex;
    align-items: center; */
    display: block;
    width: 100px;
  }
  .nav-center {
    display: flex;
    /* width: 90vw; */
    width: 90%;
    align-items: center;
    justify-content: space-between;
  }
  .toggle-btn {
    background: transparent;
    border-color: transparent;
    color: var(--primary-500);
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  .btn-container {
    display: flex;
    /* position: relative; */
    button {
      font-size: 1rem;
    }
  }
  .btn {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: 1rem;
    box-shadow: var(--shadow-2);
  }

  .dropdown {
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    background: var(--primary-100);
    box-shadow: var(--shadow-2);
    visibility: hidden;
    border-radius: var(--border-radius);

    color: var(--primary-500);
    text-transform: capitalize;
    border-color: transparent;
    padding: 0.5rem;
    cursor: pointer;
    /* display: inline-block; */
  }
  .show-dropdown {
    visibility: visible;
  }

  .logo-text {
    display: none;
    margin: 0;
  }
  @media (min-width: 992px) {
    position: sticky;
    top: 0;
    z-index: 10; // ??

    .logo {
      display: none;
    }
    .logo-text {
      display: block;
    }
  }
`;

type Props = {
  user: { name: string };
  onLogout: VoidFunction;
  onMenuClick: VoidFunction;
};

const ThemeToggleWrapper = styled.button`
  background: transparent;
  border-color: transparent;
  display: flex;
  align-items: center;
  margin-right: 1rem;
  cursor: pointer;
  color: var(--text-color);
`;

const ThemeToggle: React.FC = () => {
  const { darkTheme, toggleTheme } = useThemeContext();

  return (
    <ThemeToggleWrapper onClick={toggleTheme}>
      {darkTheme ? <Moon /> : <Sun />}
    </ThemeToggleWrapper>
  );
};

const Navbar: React.FC<Props> = ({ user, onMenuClick, onLogout }) => {
  const [showLogout, setShowLogout] = useState<boolean>(false);
  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={onMenuClick}>
          <AlignLeft size={32} />
        </button>
        <div>
          <Logo />
          <h4 className="logo-text">dashboard</h4>
        </div>
        <div className="btn-container">
          <ThemeToggle />
          <div style={{ position: "relative" }}>
            <button
              type="button"
              className="btn"
              onClick={() => {
                setShowLogout((prev) => !prev);
              }}
            >
              <User size={20} />
              {user?.name}
              <ChevronDown size={20} />
            </button>
            {/* <div className={`dropdown ${showLogout && "show-dropdown"}`}>
              <button type="button" className="dropdown-btn" onClick={onLogout}>
                logout
              </button>
            </div> */}
            <button
              className={`dropdown ${showLogout && "show-dropdown"}`}
              type="button"
              onClick={onLogout}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
