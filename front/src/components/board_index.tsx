import axios, { AxiosInstance } from "axios";
import Link from "next/link";
import { useState } from "react";
import { getCookie } from "typescript-cookie";
import { Board } from "../types/board";

type Props = {
  board: Board[]
}

export const Board_index = (props: Props) => {
  const [boardIndex, setBoardIndex] = useState<Board[]>(props.board);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const createBoardSubmit = (event: any) => {
    event.preventDefault();
    const boardData = new FormData(event.currentTarget);
    const createAxiosInstance: () => AxiosInstance = () => {
      return axios.create({
        baseURL: `/api/v1/`,
        headers: {
          "Content-Type": "application/json",
          uid: getCookie("uid"),
          client: getCookie("client"),
          "access-token": getCookie("access-token"),
        },
      });
    }
    const axiosInstance: AxiosInstance = createAxiosInstance();
    (async () => {
      setIsError(false);
      setErrorMessage("");
      await axiosInstance
        .post("boards", {
          title: boardData.get("title"),
        })
      return await axiosInstance
        .get("boards")
        .then((response) => {
          setBoardIndex(response.data.data);
        })
    })();
  }
  return(
    <>
      {isError ? (
        <p>{errorMessage}</p>
      ) : null}
      <div>
        {boardIndex.map((board) => (
          <div key={board.id}>
            <Link href={`/boards/${board.id}`}>
              <a>{board.title}</a>
            </Link>
          </div>
        ))}
        <form onSubmit={createBoardSubmit}>
          <label>タイトル</label>
          <input name="title" title="title" type="text"/>
          <button title="作成" type="submit">作成</button>
        </form>
      </div>
    </>
  )
}
