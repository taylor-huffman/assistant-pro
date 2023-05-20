class Account < ApplicationRecord
    has_secure_password

    has_one_attached :image
    has_one :assistant, dependent: :destroy
    has_one :employer, dependent: :destroy
    # has_many :task_posts, through: :employer
    # has_many :task_agreements, through: :task_posts

    validates :email, presence: true, uniqueness: true
    validates :name, :address, :phone, presence: true
    validates :image, presence: { message: 'must be uploaded' }
end
