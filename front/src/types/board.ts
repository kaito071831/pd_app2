import { Pagination } from "./pagination"

export type Board = {
  id: number
  title: string
  created_at: string
  updated_at: string
}

export type Boards = {
  status: string
  message: string
  data: Board[]
}

// ページネーション情報付きのBoards
export type PageBoards = {
  status: string
  message: string
  data: Board[]
  pagination: Pagination
}
