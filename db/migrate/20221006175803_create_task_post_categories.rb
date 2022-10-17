class CreateTaskPostCategories < ActiveRecord::Migration[7.0]
  def change
    create_table :task_post_categories do |t|
      t.integer :task_post_id
      t.integer :task_category_id

      t.timestamps
    end
  end
end
