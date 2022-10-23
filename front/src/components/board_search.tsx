import { AxiosInstance } from "axios"
import { createAxiosInstance } from "../libs/haveSession"
import { Board } from "../types/board"

type Props = {
  setBoardIndex: React.Dispatch<React.SetStateAction<Board[]>>
}

export const BoardSearch = (props: Props) => {
  const setBoardIndex = (boards: Board[]) => {
    props.setBoardIndex(boards);
  }
  const searchBoard = (event: any) => {
    event.preventDefault();
    const searchData: FormData = new FormData(event.currentTarget);
    const axiosInstance: AxiosInstance = createAxiosInstance();
    (async() =>{
      await axiosInstance.get(`boards/search?searchword=${searchData.get("searchword")}`)
        .then((response: any) => {
          setBoardIndex(response.data.data)
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
