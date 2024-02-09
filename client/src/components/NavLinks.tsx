import styled from "@emotion/styled";

import { NavLink } from "react-router-dom";
import links from "../utils/links";

type Props = {
  role: string;
  onClick?: VoidFunction;
};

const Wrapper = styled.div`
  padding-top: 2rem;
  /* display: flex;
  flex-direction: column; */

  .nav-link {
    display: flex;
    align-items: center;
    color: var(--text-secondary-color);
    padding: 1rem 0;
    /* padding-left: 2.5rem; */
    text-transform: capitalize;

    transition: var(--transition);
  }
  .nav-link:hover {
    color: var(--primary-500);
  }

  .icon {
    margin-right: 1rem;
  }
  .active {
    color: var(--primary-500);
  }
`;

const NavLinks: React.FC<Props> = ({ onClick, role }) => {
  const notAdmin = role !== "admin";

  return (
    <Wrapper>
      {links
        .filter((l) => !(l.path === "admin" && notAdmin))
        .map((l) => {
          const { text, icon, id, path } = l;

          // https://reactrouter.com/en/main/components/nav-link
          // 'active' class is added by default
          // onClick={onChange}

          // https://stackoverflow.com/questions/70644361/react-router-dom-v6-shows-active-for-index-as-well-as-other-subroutes
          // 'end' property
          return (
            <NavLink
              // reloadDocument={reload}
              className="nav-link"
              to={path}
              key={id}
              onClick={onClick}
              end
            >
              <span className="icon">{icon}</span>
              {text}
            </NavLink>
          );
        })}
    </Wrapper>
  );
};

export default NavLinks;
