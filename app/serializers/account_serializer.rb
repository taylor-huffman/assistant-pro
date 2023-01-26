class AccountSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :password_digest, :address, :phone

  has_one :employer
  has_one :assistant
  # has_many :task_posts, through: :employer
  # has_many :task_agreements
end
