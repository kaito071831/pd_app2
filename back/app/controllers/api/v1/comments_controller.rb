class Api::V1::CommentsController < ApplicationController
  before_action :authenticate_api_v1_user!

  def index
    comments = Comment.where(board_id: params[:board_id])
  end

  def show
  end

  def create
  end

  def update
  end

  def destroy
  end
end
