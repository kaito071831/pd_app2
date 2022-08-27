import { GetServerSideProps } from "next";
import { Logout_button } from "../../components/logout_button";
import { withAuthServerSideProps } from "../../libs/auth";

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps("api/v1/boards");

const Boards = () => {
  return(
    <>
      Boards
      <Logout_button/>
    </>
  )
}

export default Boards;
