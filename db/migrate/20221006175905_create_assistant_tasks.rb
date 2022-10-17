class CreateAssistantTasks < ActiveRecord::Migration[7.0]
  def change
    create_table :assistant_tasks do |t|
      t.integer :assistant_id
      t.integer :task_category_id

      t.timestamps
    end
  end
end
