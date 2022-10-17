class CreateTaskAgreements < ActiveRecord::Migration[7.0]
  def change
    create_table :task_agreements do |t|
      t.integer :employer_id
      t.integer :assistant_id
      t.integer :hourly_rate
      t.string :task_agreement_notes
      t.boolean :is_completed
      t.integer :task_post_id

      t.timestamps
    end
  end
end
