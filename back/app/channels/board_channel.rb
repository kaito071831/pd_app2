class BoardChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from "board_channel_#{params[:room]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def test
    ActionCable.server.broadcast("chat:#{params[:room]}", { body: "#{params[:room]}を購読する！"})
  end
end
