class CreateTaskPosts < ActiveRecord::Migration[7.0]
  def change
    create_table :task_posts do |t|
      t.integer :employer_id
      t.string :task_description
      t.integer :hourly_rate

      t.timestamps
    end
  end
end
