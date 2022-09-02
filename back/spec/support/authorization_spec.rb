module AuthorizationHelper

  # セッションを生成する
  def sign_in(user)
    post api_v1_user_session_path, params: { email: user.email, password: user.password }, as: :json
    response.headers.slice('client', 'uid', 'access-token')
  end
end
