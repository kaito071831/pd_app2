import axios, { AxiosInstance } from "axios";
import Link from "next/link";
import { useState } from "react";
import { getCookie } from "typescript-cookie";
import { Board } from "../types/board";
import { Pagination } from "../types/pagination";

type Props = {
  boards: Board[]
  pagination: Pagination
}

export const Board_index = (props: Props) => {
  const [boardIndex, setBoardIndex] = useState<Board[]>(props.boards);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const pagination: Pagination = props.pagination;
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
  const createBoardSubmit = (event: any) => {
    event.preventDefault();
    const boardData: FormData = new FormData(event.currentTarget);
    const axiosInstance: AxiosInstance = createAxiosInstance();
    (async () => {
      setIsError(false);
      setErrorMessage("");
      await axiosInstance
        .post("boards", {
          title: boardData.get("title"),
        })
      return await axiosInstance
        .get("boards/pagination")
        .then((response) => {
          setBoardIndex(response.data.data);
        })
        .then(() => {
          document.boardForm.reset();
        })
    })();
  }

  const range = (start: number, end: number): number[] => [...Array(end - start + 1)].map((_, i) => start + i)

  const movePage = (pageNum: number) => {
    const axiosInstance: AxiosInstance = createAxiosInstance();
    (async() => {
      return await axiosInstance
        .get(`boards/pagination?page=${pageNum}`)
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
        {range(1, Math.ceil(pagination.total_count / pagination.limit_value)).map((num: number, index: number) => (
          <Link key={index} href={`/boards`}>
            <span onClick={() => movePage(num)}>{num}</span>
          </Link>
        ))}
        <form name="boardForm" onSubmit={createBoardSubmit}>
          <label>タイトル</label>
          <input name="title" title="title" type="text"/>
          <button title="作成" type="submit">作成</button>
        </form>
      </div>
    </>
  )
}
