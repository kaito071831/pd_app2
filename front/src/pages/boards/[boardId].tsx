import { Box } from "@mui/material";
import { Container } from "@mui/system";
import { GetServerSideProps, NextPage } from "next";
import dynamic from "next/dynamic";
import { NextRouter, useRouter } from "next/router";
import { Header } from "../../components/header";
import { withAuthServerSideProps } from "../../libs/auth";
import { Board, Boards } from "../../types/board";

type Props = {
  data: Boards
}

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps(`api/v1/boards/`);

const Comments = dynamic(() => import('../../components/board_comment'), { ssr: false })

const Board: NextPage = (props: Props) => {
  const router: NextRouter = useRouter();
  const board_id: number = Number(router.query.boardId);
  const boards: Board[] = props.data.data;
  const reverse_boards: Board[] = [...boards].reverse();
  const board: Board = reverse_boards[board_id - 1];
  return(
    <>
      <Header/>
      <Container maxWidth={"md"}>
        <Box component={"h2"} sx={{textAlign: "center"}}>{board.title}</Box>
        <Box component={"div"}>
          <Comments id={board_id}/>
        </Box>
      </Container>
    </>
  )
}

export default Board;
