class CreateEmployers < ActiveRecord::Migration[7.0]
  def change
    create_table :employers do |t|
      t.string :company_name
      t.string :company_bio
      t.date :company_start_date
      t.integer :account_id

      t.timestamps
    end
  end
end
