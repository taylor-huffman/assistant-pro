class Account < ApplicationRecord
    has_secure_password

    has_one :assistant
    has_one :employer
    has_many :task_posts, through: :employer
    # has_many :task_agreements, through: :task_posts

    validates :email, presence: true, uniqueness: true
end
