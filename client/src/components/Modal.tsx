import styled from "@emotion/styled";

import { X } from "react-feather";

const Wrapper = styled.aside`
  /* @media (min-width: 992px) {
    display: none;
  } */
  .sidebar-container {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1;
    opacity: 0;
    transition: var(--transition);

    overflow: auto;
  }
  .show-sidebar {
    z-index: 99;
    opacity: 1;
  }
  .content {
    background: var(--background-secondary-color);
    border-radius: var(--border-radius);
    padding: 4rem 2rem;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
  }
  .close-btn {
    position: absolute;
    top: 10px;
    left: 10px;
    background: transparent;
    border-color: transparent;
    color: var(--red-dark);
    cursor: pointer;
  }
`;

type Props = {
  visible: boolean;
  onChange: VoidFunction;
  children: React.ReactNode;
};

const Modal: React.FC<Props> = ({ visible, onChange, children }) => {
  return (
    <Wrapper>
      <div className={`sidebar-container ${visible && "show-sidebar"}`}>
        <div className="content">
          <button type="button" className="close-btn" onClick={onChange}>
            <X size={48} />
          </button>
          {children}
        </div>
      </div>
    </Wrapper>
  );
};

export default Modal;
