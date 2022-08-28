import { GetServerSideProps } from "next";
import { Logout_button } from "../../components/logout_button";
import { withAuthServerSideProps } from "../../libs/auth";

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps("api/v1/boards");

const Boards = ({data}) => {
  return(
    <>
      Boards
      <Logout_button/>
      {data.data.map((board, index) => (
        <div id={index}>
          <p>{board.id}</p>
          <p>{board.title}</p>
        </div>
      ))}
    </>
  )
}

export default Boards;
