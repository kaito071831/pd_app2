# データベースのスキーマ
## 構成
- User
  - email: string
- Board
  - title: string
- Comment
  - author: User -> uid
  - comment: text
  - Board -> board_id
