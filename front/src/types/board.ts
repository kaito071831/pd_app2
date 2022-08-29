export type Board = {
  id: number
  title: string
  created_at: string
  updated_at: string
}

export type Boards = {
  status: string
  message: string
  boards: Board[]
}
