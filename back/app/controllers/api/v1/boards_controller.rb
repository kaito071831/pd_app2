class Api::V1::BoardsController < ApplicationController
  include Pagination
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

  def pagination
    boards = Board.order(created_at: :desc).page(params[:page]).per(5)
    pagination = paginate(boards)
    render json: 
      {
        status: 'SUCCESS',
        message: 'Loaded pagination boards',
        data: boards,
        pagination: pagination
      }
  end

  def show
    render json:
      {
        status: 'SUCCESS',
        message: 'Loaded board',
        data: @board
      }
  end

  def create
    board = Board.new(board_params)
    if board.save
      render json:
        {
          status: 'SUCCESS',
          message: 'Created board',
          data: board
        }
    else
      render json:
        {
          status: 'FAILED',
          message: 'Could not create board',
          data: board.errors
        }
    end
  end

  def update
    if @board.update(board_params)
      render json:
        {
          status: 'SUCCESS',
          message: 'Updated the board',
          data: @board
        }
    else
      render json:
        {
          status: 'SUCCESS',
          message: 'Not update',
          data: @board
        }
    end
  end

  def destroy
    if @board.destroy
      render json:
        {
          status: 'SUCCESS',
          message: 'Deleted the board',
          data: @board
        }
    else
      render json:
        {
          status: 'FAILED',
          message: 'Not deleted',
          data: @board.errors
        }
    end
  end

  def search
    if params[:searchword] == ""
      boards = Board.order(created_at: :desc).page(params[:page]).per(5)
      pagination = paginate(boards)
      render json: 
        {
          status: 'SUCCESS',
          message: 'Loaded pagination boards',
          data: boards,
          pagination: pagination
        }
    else
      boards = Board.where('title like ?', "%#{params[:searchword]}%").order(created_at: :desc)    
      render json:
        {
          status: 'SUCCESS',
          message: 'Load search boards',
          data: boards,
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
