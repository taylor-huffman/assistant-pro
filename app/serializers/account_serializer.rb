class AccountSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :password, :address, :phone

  has_one :employer
  has_one :assistant
  # has_many :task_posts
  # has_many :task_agreements
end
