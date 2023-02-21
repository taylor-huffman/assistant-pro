class Account < ApplicationRecord
    has_secure_password

    has_one :assistant, dependent: :destroy
    has_one :employer, dependent: :destroy
    # has_many :task_posts, through: :employer
    # has_many :task_agreements, through: :task_posts

    validates :email, presence: true, uniqueness: true
end
