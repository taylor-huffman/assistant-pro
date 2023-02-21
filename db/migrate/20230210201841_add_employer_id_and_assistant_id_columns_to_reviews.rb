class AddEmployerIdAndAssistantIdColumnsToReviews < ActiveRecord::Migration[7.0]
  def change
    add_column :reviews, :employer_id, :integer
    add_column :reviews, :assistant_id, :integer
  end
end
