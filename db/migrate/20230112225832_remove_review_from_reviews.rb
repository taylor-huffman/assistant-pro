class RemoveReviewFromReviews < ActiveRecord::Migration[7.0]
  def change
    remove_column :reviews, :review
  end
end
