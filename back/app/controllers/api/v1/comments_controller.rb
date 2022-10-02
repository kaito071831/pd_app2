class Api::V1::CommentsController < ApplicationController
  before_action :authenticate_api_v1_user!
  before_action :set_comment, only: %w[show update destroy]

  def index
    comments = Comment.where(board_id: params[:board_id])
    render json:
      {
        status: 'SUCCESS',
        message: 'Loaded comments',
        data: comments
      }
  end

  def show
    render json:
      {
        status: 'SUCCESS',
        message: 'Loaded comment',
        data: @comment
      }
  end

  def create
    comment = Comment.new(comment_params)
    if comment.save
      render json:
        {
          status: 'SUCCESS',
          message: 'Created comment',
          data: comment
        }
    else
      render json:
        {
          status: 'FAILED',
          message: 'Could not create comment',
          data: comment.errors
        }
    end
  end

  def update
    if @comment.update(comment_params)
      render json:
        {
          status: 'SUCCESS',
          message: 'Updated the comment',
          data: @comment
        }
    else
      render json:
        {
          status: 'SUCCESS',
          message: 'Not update',
          data: @comment
        }
    end
  end

  def destroy
    if @comment.destroy
      render json:
        {
          status: 'SUCCESS',
          message: 'Deleted the comment',
          data: @comment
        }
    else
      render json:
        {
          status: 'FAILED',
          message: 'Not deleted',
          data: @comment.errors
        }
    end
  end

  private

  def set_comment
    @comment = Comment.find(params[:id])
  end

  def comment_params
    params.require(:comment).permit(:name, :comment, :user_id, :board_id)
  end
end
