import { GetServerSideProps } from "next";
import { Board_index } from "../../components/board_index";
import { Logout_button } from "../../components/logout_button";
import { withAuthServerSideProps } from "../../libs/auth";
import type { Boards, Board } from "../../types/board";

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps("api/v1/boards");

type Props = {
  data: Boards
}

const Boards = ({data}: Props) => {
  const boards: Board[] = data.data;
  return(
    <>
      Boards
      <Logout_button/>
      <Board_index board={boards} />
    </>
  )
}

export default Boards;
