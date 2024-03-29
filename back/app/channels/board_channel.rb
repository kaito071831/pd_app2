class BoardChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from "board_channel_#{params[:room]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  # コメントをDBに登録してその板のコメントを送信する
  def post(message)
    boardId = message['commentData']['boardId']

    Comment.create! name: message['commentData']['name'], comment: message['commentData']['comment'],
      board_id: boardId, user_id: User.find_by(email: message['commentData']['uid']).id 
    ActionCable.server.broadcast("board_channel_#{params[:room]}", {comments: Comment.where(board_id: boardId)})
  end
end
