require 'rails_helper'

RSpec.describe "Api::V1::Boards", type: :request do
  let!(:user) { create(:user) }
  let!(:token) { sign_in(user) }

  describe "GET /api/v1/boards" do
    it "works! (now write some real specs)" do
      get api_v1_boards_path,  headers: token
      expect(response).to have_http_status(200)
    end
  end
end
