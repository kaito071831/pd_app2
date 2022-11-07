import { Container } from "@mui/material";
import { GetServerSideProps } from "next";
import { Board_index } from "../../components/board_index";
import { Header } from "../../components/header";
import { withAuthServerSideProps } from "../../libs/auth";
import type { Board, PageBoards } from "../../types/board";
import { Pagination } from "../../types/pagination";

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps("api/v1/boards/pagination");

type Props = {
  data: PageBoards
}

const Boards = ({data}: Props) => {
  const boards: Board[] = data.data;
  const pagination: Pagination = data.pagination;
  return(
    <>
      <Header/>
      <Container fixed>
        <Board_index boards={boards} pagination={pagination} />
      </Container>
    </>
  )
}

export default Boards;
