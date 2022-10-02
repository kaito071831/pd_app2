import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { withAuthServerSideProps } from "../../libs/auth";
import { Board, Boards } from "../../types/board";

type Props = {
  data: Boards
}

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps(`api/v1/boards/`);

const Board: NextPage = (props: Props) => {
  const router = useRouter();
  const board_id = router.query.boardId;
  const boards: Board[] = props.data.data;
  const board: Board = boards[boards.length - Number(board_id)];
  return(
    <>
      <div>{board.title}</div>
      <div>
      </div>
    </>
  )
}

export default Board;
