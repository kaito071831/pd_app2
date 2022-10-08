module Pagination
  extend ActiveSupport::Concern

  # ページネーションの情報を取得する
  def paginate(records)
    {
      total_count: records.total_count,
      limit_value: records.limit_value,
      total_pages: records.total_pages,
      current_page: records.current_page
    }
  end
end
