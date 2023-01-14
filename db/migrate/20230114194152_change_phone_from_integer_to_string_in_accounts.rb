class ChangePhoneFromIntegerToStringInAccounts < ActiveRecord::Migration[7.0]
  def change
    change_column :accounts, :phone, :string
  end
end
