import { GetServerSideProps } from "next";
import { Logout_button } from "../../components/logout_button";
import { withAuthServerSideProps } from "../../libs/auth";
import type { Boards, Board } from "../../types/board";

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps("api/v1/boards");

type Props = {
  data: Boards
}

const Boards = ({data}: Props) => {
  const boardIndex: Board[] = data.boards;
  return(
    <>
      Boards
      <Logout_button/>
      {boardIndex.map((board: Board) => (
        <div key={board.id}>
          <p>{board.id}</p>
          <p>{board.title}</p>
        </div>
      ))}
    </>
  )
}

export default Boards;
