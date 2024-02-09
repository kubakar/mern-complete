import styled from "@emotion/styled";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "react-feather";
ChevronLeft;

const Wrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  gap: 2rem;
  height: 100%;
`;

const PageBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius);
  background: var(--background-secondary-color);

  width: 6rem;

  font-weight: 700;
`;

type Props = {
  currentPage: number;
  pages: number;
  onPageChange: (page: number) => void;
};

const PaginationContainer: React.FC<Props> = ({
  currentPage,
  pages,
  onPageChange,
}) => {
  return (
    <Wrapper>
      <button
        disabled={currentPage <= 1}
        className="btn"
        onClick={() => {
          onPageChange(1);
        }}
      >
        <ChevronsLeft />
      </button>
      <button
        disabled={currentPage <= 1}
        className="btn"
        onClick={() => {
          onPageChange(currentPage - 1);
        }}
      >
        <ChevronLeft />
      </button>
      <PageBox>{currentPage}</PageBox>
      <button
        disabled={currentPage >= pages}
        className="btn"
        onClick={() => {
          onPageChange(currentPage + 1);
        }}
      >
        <ChevronRight />
      </button>
      <button
        disabled={currentPage >= pages}
        className="btn"
        onClick={() => {
          onPageChange(pages);
        }}
      >
        <ChevronsRight />
      </button>
    </Wrapper>
  );
};
export default PaginationContainer;
