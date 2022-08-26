class Api::V1::BoardsController < ApplicationController
  before_action :authenticate_api_v1_user!

  def index
    boards = Board.order(created_at: :desc)
    render json: 
      {
        status: 'SUCCESS',
        message: 'Loaded Boards',
        data: boards
      }
  end

end
