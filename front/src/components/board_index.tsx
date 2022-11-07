import { Alert, Snackbar } from "@mui/material";
import { AxiosInstance } from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { createAxiosInstance } from "../libs/haveSession";
import { Board } from "../types/board";
import { Pagination } from "../types/pagination";
import { BoardPagination } from "./board_pagination";
import { BoardSearch } from "./board_search";

type Props = {
  boards: Board[]
  pagination: Pagination
}

export const Board_index = (props: Props) => {
  const [boards, setBoards] = useState<Board[]>(props.boards);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [pagination, setPagination] = useState<Pagination>(props.pagination);
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
          setBoards(response.data.data);
        })
        .then(() => {
          document.boardForm.reset();
        })
    })();
  }

  return(
    <>
      <Snackbar open={isError} autoHideDuration={60}>
        <Alert severity="error" onClose={() => { setIsError(false) }}>{errorMessage}</Alert>
      </Snackbar>
      <div>
        <BoardSearch setBoards={setBoards} setPagination={setPagination}/>
        {boards.map((board) => (
          <div key={board.id}>
            <Link href={`/boards/${board.id}`}>
              <a>{board.title}</a>
            </Link>
          </div>
        ))}
        <BoardPagination setBoards={setBoards} pagination={pagination}/>
        <form name="boardForm" onSubmit={createBoardSubmit}>
          <label>タイトル</label>
          <input name="title" title="title" type="text"/>
          <button title="作成" type="submit">作成</button>
        </form>
      </div>
    </>
  )
}
