import { Alert, Box, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, Snackbar } from "@mui/material";
import { AxiosInstance } from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { createAxiosInstance } from "../libs/haveSession";
import { Board } from "../types/board";
import { Pagination } from "../types/pagination";
import { BoardPagination } from "./board_pagination";
import { BoardSearch } from "./board_search";
import AddCircleIcon from '@mui/icons-material/AddCircle';

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
        <div>
          {boards.map((board) => (
            <div key={board.id}>
              <Link href={`/boards/${board.id}`}>
                <Paper elevation={5} variant="elevation" sx={{
                  m: 2,
                  height: 80
                }}>
                  <Box component="p" sx={{
                    height: "100%",
                    lineHeight: 4,
                    textAlign: "center",
                    cursor: "pointer"
                  }}>
                    {board.title}
                  </Box>
                </Paper>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Grid container justifyContent="center" sx={{
        mt: 2,
        mb: 2
      }}>
        <BoardPagination setBoards={setBoards} pagination={pagination}/>
      </Grid>
      <div>
        <form name="boardForm" onSubmit={createBoardSubmit}>
          <FormControl variant="outlined" margin="dense" fullWidth sx={{mt: 2}}>
            <InputLabel htmlFor="outlined-adornment-createBoard" size="small">タイトル</InputLabel>
            <OutlinedInput
              id="outlined-adornment-createBoard"
              size="small"
              name="title"
              type="text"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    type="submit"
                    edge="end"
                    sx={{
                      cursor: "pointer"
                    }}
                    >
                    <AddCircleIcon/>
                  </IconButton>
                </InputAdornment>
              }
              label="タイトル"
            />
          </FormControl>
        </form>
      </div>
    </>
  )
}
