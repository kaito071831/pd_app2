# データベースのスキーマ
## 構成
- User
  - email: string
- Board
  - title: string
- Comment
  - name: string
  - comment: text
  - User -> user_id
  - Board -> board_id
