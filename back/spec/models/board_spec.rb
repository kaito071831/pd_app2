require 'rails_helper'

RSpec.describe Board, type: :model do
  let(:board) { build(:board) }
  it "タイトルが100文字以内である場合、有効である" do
    expect(board).to be_valid
  end

  it "タイトルが100文字を以上の場合、無効である" do
    board.title = "a" * 101
    expect(board).to_not be_valid
  end
end
