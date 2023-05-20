class AccountSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :name, :email, :password_digest, :address, :phone, :image

  has_one :employer
  has_one :assistant
  # has_many :task_posts, through: :employer
  # has_many :task_agreements

  def image
    rails_blob_path(object.image, only_path: true) if object.image.attached?
  end
end
