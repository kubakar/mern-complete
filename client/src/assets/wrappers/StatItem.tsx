import styled from "@emotion/styled";

const Wrapper = styled.article`
  padding: 2rem;
  background: var(--background-secondary-color);
  border-bottom: 5px solid ${(props) => props.color};
  border-radius: var(--border-radius);

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .count {
    font-weight: 700;
    font-size: 50px;
    color: ${(props) => props.color};
    line-height: 2;
  }
  .title {
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);

    font-size: 1.25rem;
  }
  .icon {
    // aligns icon a bit lower
    display: flex;
    /* align-items: center; */
    /* justify-content: center; */

    color: ${(props) => props.color};
  }
`;

export default Wrapper;
