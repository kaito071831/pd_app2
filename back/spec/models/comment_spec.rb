require 'rails_helper'

RSpec.describe Comment, type: :model do
  let(:comment) { create(:comment) }

  it "commentが65536文字以上であれば、無効" do
    comment.comment = "a" * 65536
    expect(comment).to_not be_valid  
  end
end
