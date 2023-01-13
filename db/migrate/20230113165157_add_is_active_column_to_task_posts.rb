class AddIsActiveColumnToTaskPosts < ActiveRecord::Migration[7.0]
  def change
    add_column :task_posts, :is_active, :boolean
  end
end
