import { AxiosInstance } from "axios"
import { NextRouter, useRouter } from "next/router"
import { createAxiosInstance } from "../libs/haveSession"
import { Board } from "../types/board"
import { Pagination } from "../types/pagination"

type Props = {
  setBoardIndex: React.Dispatch<React.SetStateAction<Board[]>>
  setPagination: React.Dispatch<React.SetStateAction<Pagination>>
}

export const BoardSearch = (props: Props) => {
  const setBoardIndex = (boards: Board[]) => {
    props.setBoardIndex(boards);
  }
  const setPagination = (pagination: Pagination) => {
    props.setPagination(pagination);
  }
  const router: NextRouter = useRouter();
  const searchBoard = (event: any) => {
    event.preventDefault();
    const searchData: FormData = new FormData(event.currentTarget);
    const axiosInstance: AxiosInstance = createAxiosInstance();
    const searchWord = searchData.get("searchword");
    (async() =>{
      await axiosInstance.get(`boards/search?searchword=${searchWord}`)
        .then((response: any) => {
          setBoardIndex(response.data.data)
          setPagination(response.data.pagination)
        })
      await router.push({
          pathname: "/boards",
          query: { searchword: searchWord.toString() }
        })
    })();
  }
  return(
    <>
      <form onSubmit={searchBoard}>
        <input type="text" name="searchword" placeholder="ワードを入力"/>
        <button type="submit">検索</button>
      </form>
    </>
  )
}
