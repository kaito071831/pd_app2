import { AxiosInstance } from "axios";
import { NextRouter, useRouter } from "next/router";
import { createAxiosInstance } from "../libs/haveSession";
import { Board } from "../types/board";
import { Pagination } from "../types/pagination";

type BoardPage = {
  setBoardIndex: React.Dispatch<React.SetStateAction<Board[]>>
  pagination: Pagination
}

export const BoardPagination = (props: BoardPage) => {
  const setBoardIndex = (boards: Board[]) => {
    props.setBoardIndex(boards);
  }
  const router: NextRouter = useRouter();
  const pagination: Pagination = props.pagination;

  const range = (start: number, end: number): number[] => [...Array(end - start + 1)].map((_, i) => start + i)
  const movePage = (pageNum: number) => {
    const axiosInstance: AxiosInstance = createAxiosInstance();
    (async() => {
      // クエリsearchwordが空ならば通常の一覧そうでなければ検索の一覧のページネーションとして機能させる
      if (router.query.searchword === "" || router.query.searchword === undefined){
        return await axiosInstance
          .get(`boards/pagination?page=${pageNum}`)
          .then((response) => {
            setBoardIndex(response.data.data);
          })
      } else {
        return await axiosInstance
          .get(`boards/search?page=${pageNum}&searchword=${router.query.searchword}`)
          .then((response) => {
            setBoardIndex(response.data.data);
          })
      }
    })();
  }

  return(
    <>
      {range(1, Math.ceil(pagination.total_count / pagination.limit_value)).map((num: number, index: number) => (
        <span key={index} onClick={() => movePage(num)}>{num}</span>
      ))}
    </>
  )
}
