import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material"
import { AxiosInstance } from "axios"
import { NextRouter, useRouter } from "next/router"
import { createAxiosInstance } from "../libs/haveSession"
import { Board } from "../types/board"
import { Pagination } from "../types/pagination"
import SearchIcon from '@mui/icons-material/Search';

type Props = {
  setBoards: React.Dispatch<React.SetStateAction<Board[]>>
  setPagination: React.Dispatch<React.SetStateAction<Pagination>>
}

export const BoardSearch = (props: Props) => {
  const setBoards = (boards: Board[]) => {
    props.setBoards(boards);
  }
  const setPagination = (pagination: Pagination) => {
    props.setPagination(pagination);
  }
  const router: NextRouter = useRouter();
  const searchBoard = (event: any) => {
    event.preventDefault();
    const searchData: FormData = new FormData(event.currentTarget);
    const axiosInstance: AxiosInstance = createAxiosInstance();
    const searchWord = searchData.get("searchword"); // 検索ボックスのワードを取り出す
    (async() =>{
      // 検索してその結果とページ情報を格納する
      await axiosInstance.get(`boards/search?searchword=${searchWord}`)
        .then((response: any) => {
          setBoards(response.data.data)
          setPagination(response.data.pagination)
        })
      // 検索ワードをクエリストリングスに追加する
      await router.push({
          pathname: "/boards",
          query: { searchword: searchWord.toString() }
        })
    })();
  }
  return(
    <>
      <form onSubmit={searchBoard}>
        <FormControl variant="outlined" margin="dense" fullWidth sx={{mt: 2}}>
          <InputLabel htmlFor="outlined-adornment-search" size="small">検索</InputLabel>
          <OutlinedInput
            id="outlined-adornment-search"
            size="small"
            name="searchword"
            type="text"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  type="submit"
                  edge="end"
                  >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
            label="検索"
            />
          </FormControl>
      </form>
    </>
  )
}
