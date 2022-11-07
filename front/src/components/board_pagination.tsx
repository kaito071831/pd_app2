import { Pagination } from "@mui/material";
import { AxiosInstance } from "axios";
import { NextRouter, useRouter } from "next/router";
import React, { useState } from "react";
import { createAxiosInstance } from "../libs/haveSession";
import { Board } from "../types/board";
import { Pagination as Page } from "../types/pagination";

type BoardPage = {
  setBoards: React.Dispatch<React.SetStateAction<Board[]>>
  pagination: Page
}

export const BoardPagination = (props: BoardPage) => {
  const [page, setPage] = useState<number>(1);
  const setBoards = (boards: Board[]) => {
    props.setBoards(boards);
  }
  const router: NextRouter = useRouter();
  const pagination: Page = props.pagination;

  // const range = (start: number, end: number): number[] => [...Array(end - start + 1)].map((_, i) => start + i)
  const movePage = (event: React.ChangeEvent<unknown>, value: number) => {
    const newPage: number = value;
    setPage(newPage);
    const axiosInstance: AxiosInstance = createAxiosInstance();
    (async() => {
      // クエリsearchwordが空ならば通常の一覧そうでなければ検索の一覧のページネーションとして機能させる
      if (router.query.searchword === "" || router.query.searchword === undefined){
        return await axiosInstance
          .get(`boards/pagination?page=${newPage}`)
          .then((response) => {
            setBoards(response.data.data);
          })
      } else {
        return await axiosInstance
          .get(`boards/search?page=${newPage}&searchword=${router.query.searchword}`)
          .then((response) => {
            setBoards(response.data.data);
          })
      }
    })();
  }

  return(
    <>
      {/* {range(1, Math.ceil(pagination.total_count / pagination.limit_value)).map((num: number, index: number) => (
        <span key={index} onClick={() => movePage(num)}>{num}</span>
      ))} */}
      <p>{page}</p>
      <Pagination
        count={Math.ceil(pagination.total_count / pagination.limit_value)}
        page={page}
        onChange={movePage}
        showFirstButton
        showLastButton
      />
    </>
  )
}
