class Api::V1::BoardsController < ApplicationController
  before_action :authenticate_api_v1_user!
  before_action :set_board, only: %w[show update destroy]

  def index
    boards = Board.order(created_at: :desc)
    render json: 
      {
        status: 'SUCCESS',
        message: 'Loaded boards',
        data: boards
      }
  end

  def show
    render json:
      {
        status: 'SUCCESS',
        message: 'Loaded board',
        data: board
      }
  end

  def create
    board = Board.new(board_params)
    if board.save?
      render json:
        {
          status: 'SUCCESS',
          message: 'Created board',
          data: board
        }
    else
      render json:
        {
          status: 'ERROR',
          message: 'Could not create board',
          data: board.errors
        }
    end
  end

  def update
    if @board.update?(board_params)
      render json:
        {
          status: 'SUCCESS',
          message: 'Updated the Board',
          data: @board
        }
    else
      render json:
        {
          status: 'SUCCESS',
          message: 'Not updated',
          data: @board
        }
    end
  end

  def destroy
    if @board.destroy?
      render json:
        {
          status: 'SUCCESS',
          message: 'Deleted the board',
          data: @board
        }
    else
      render json:
        {
          status: 'ERROR',
          message: 'Not deleted',
          data: @board.errors
        }
    end
  end

  private

  def set_board
    @board = Board.find(params[:id])
  end

  def board_params
    params.require(:board).permit(:title)
  end
end
